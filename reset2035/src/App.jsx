// ===================================================
// 2035：放課後リセット - メインアプリ
// ゲームの画面遷移と状態管理を担当
// ===================================================

import { useState, useCallback } from "react";
import { days, meterConfig, diagnosisTypes, futurePosts } from "./data/gameData";
import TitleScreen from "./components/TitleScreen";
import HowToPlayScreen from "./components/HowToPlayScreen";
import DayScreen from "./components/DayScreen";
import MeterScreen from "./components/MeterScreen";
import FutureSNSScreen from "./components/FutureSNSScreen";
import DiagnosisScreen from "./components/DiagnosisScreen";
import "./App.css";

const SCREENS = {
  TITLE: "title",
  HOW_TO_PLAY: "howtoplay",
  DAY: "day",
  METER: "meter",
  FUTURE_SNS: "futureSNS",
  DIAGNOSIS: "diagnosis",
};

const initMeters = () => ({
  HEAT: meterConfig.HEAT.startValue,
  WASTE: meterConfig.WASTE.startValue,
  MONEY: meterConfig.MONEY.startValue,
  VIBE: meterConfig.VIBE.startValue,
});

export default function App() {
  const [screen, setScreen] = useState(SCREENS.TITLE);
  const [currentDay, setCurrentDay] = useState(0);
  const [meters, setMeters] = useState(initMeters());
  const [lastChoice, setLastChoice] = useState(null);
  const [meterDeltas, setMeterDeltas] = useState({});
  const [choiceHistory, setChoiceHistory] = useState([]);

  const clamp = (v) => Math.max(0, Math.min(100, v));

  const handleChoice = useCallback((choice) => {
    const deltas = choice.meters;
    setMeterDeltas(deltas);
    setMeters((prev) => {
      const next = { ...prev };
      Object.keys(deltas).forEach((key) => {
        next[key] = clamp(prev[key] + deltas[key]);
      });
      return next;
    });
    setLastChoice(choice);
    setChoiceHistory((prev) => [...prev, { day: currentDay, choice }]);
    setScreen(SCREENS.METER);
  }, [currentDay]);

  const handleMeterNext = useCallback(() => {
    setScreen(SCREENS.FUTURE_SNS);
  }, []);

  const handleSNSNext = useCallback(() => {
    if (currentDay < days.length - 1) {
      setCurrentDay((d) => d + 1);
      setScreen(SCREENS.DAY);
    } else {
      setScreen(SCREENS.DIAGNOSIS);
    }
  }, [currentDay]);

  const handleRestart = useCallback(() => {
    setScreen(SCREENS.TITLE);
    setCurrentDay(0);
    setMeters(initMeters());
    setLastChoice(null);
    setMeterDeltas({});
    setChoiceHistory([]);
  }, []);

  const getDiagnosis = useCallback(() => {
    const scoreMeters = {
      HEAT: 100 - meters.HEAT,
      WASTE: 100 - meters.WASTE,
      MONEY: meters.MONEY,
      VIBE: meters.VIBE,
    };
    return diagnosisTypes.find((d) => d.condition(scoreMeters)) || diagnosisTypes[diagnosisTypes.length - 1];
  }, [meters]);

  // メーター値に応じて未来SNSの投稿を選ぶ
  const getCurrentPosts = useCallback(() => {
    const posts = [];
    const heatPosts = meters.HEAT > 65 ? futurePosts.heatHigh : futurePosts.heatLow;
    const wastePosts = meters.WASTE > 65 ? futurePosts.wasteHigh : futurePosts.wasteLow;
    const vibePosts = meters.VIBE > 55 ? futurePosts.vibeHigh : futurePosts.vibeLow;
    posts.push(heatPosts[currentDay % heatPosts.length]);
    posts.push(wastePosts[currentDay % wastePosts.length]);
    posts.push(vibePosts[currentDay % vibePosts.length]);
    return posts;
  }, [meters, currentDay]);

  return (
    <div className="app">
      {screen === SCREENS.TITLE && (
        <TitleScreen onStart={() => setScreen(SCREENS.HOW_TO_PLAY)} />
      )}
      {screen === SCREENS.HOW_TO_PLAY && (
        <HowToPlayScreen onStart={() => setScreen(SCREENS.DAY)} />
      )}
      {screen === SCREENS.DAY && (
        <DayScreen
          dayData={days[currentDay]}
          dayIndex={currentDay}
          totalDays={days.length}
          meters={meters}
          onChoice={handleChoice}
        />
      )}
      {screen === SCREENS.METER && lastChoice && (
        <MeterScreen
          choice={lastChoice}
          deltas={meterDeltas}
          meters={meters}
          dayData={days[currentDay]}
          onNext={handleMeterNext}
        />
      )}
      {screen === SCREENS.FUTURE_SNS && lastChoice && (
        <FutureSNSScreen
          choice={lastChoice}
          posts={getCurrentPosts()}
          dayData={days[currentDay]}
          meters={meters}
          isLastDay={currentDay === days.length - 1}
          onNext={handleSNSNext}
        />
      )}
      {screen === SCREENS.DIAGNOSIS && (
        <DiagnosisScreen
          meters={meters}
          diagnosis={getDiagnosis()}
          choiceHistory={choiceHistory}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
