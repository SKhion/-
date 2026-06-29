<footer class="site-footer" role="contentinfo">
    <div class="footer-inner">
        <div class="footer-top">
            <div class="footer-brand">
                <p class="footer-name">SHION KADO</p>
                <p class="footer-tagline">Brand Strategy &amp; Creative Direction</p>
            </div>

            <nav class="footer-nav" aria-label="Footer">
                <ul>
                    <li><a href="<?php echo esc_url( get_post_type_archive_link( 'work' ) ); ?>">Works</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>">About</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/services' ) ); ?>">Services</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/process' ) ); ?>">Process</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/ai-creative' ) ); ?>">AI × Creative</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/journal' ) ); ?>">Journal</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">Contact</a></li>
                </ul>
            </nav>

            <div class="footer-social">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            </div>
        </div>

        <div class="footer-bottom">
            <p class="footer-copy">&copy; <?php echo esc_html( date( 'Y' ) ); ?> Shion Kado. All rights reserved.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
