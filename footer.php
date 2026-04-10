<?php if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    header("Location:/");
} ?>
<script src="<?php echo $cdnpublic ?>/assets/js/bootstrap.min.js" type="application/javascript"></script>
<script src="<?php echo $templatepath; ?>/js/script.js?v=20250410"></script>

<footer class="sp-footer">
    <div class="sp-footer-inner">
        <div class="sp-footer-top">
            <?php
            if (!empty(theme_config('gonganbei', ""))) {
                preg_match_all('/\d+/', theme_config('gonganbei'), $gab);
                echo '<a class="sp-footer-link" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' . $gab[0][0] . '" target="_blank" rel="nofollow noopener">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    ' . theme_config('gonganbei') . '
                </a>';
            }
            ?>
            <?php if ($conf['icp'] != null) {
                echo '<a href="http://beian.miit.gov.cn/" class="sp-footer-link" target="_blank">' . $conf['icp'] . '</a>';
            } ?>
        </div>
        <div class="sp-footer-bottom">
            <p><?php echo $conf['copyright']; ?></p>
            <?php if ($conf['wztj'] != null) {
                echo $conf["wztj"];
            } ?>
        </div>
    </div>
</footer>

<!-- 返回顶部 -->
<button class="sp-back-top" id="spBackTop" aria-label="返回顶部">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
</button>

</body>
</html>
