<?php

$rel = $conf["mode"] == 2 ? '' : 'rel="nofollow"';
$html = array(
    'g1' => '<section class="sp-links-section" id="group_{group_id}"><div class="sp-links-container"><div class="sp-links-header">{group_icon}<h2 class="sp-links-title">{group_name}</h2></div><div class="sp-links-grid">', //分组开始标签
    'g2' => '',  //分组内容（已在g1中处理）
    'g3' => '</div></div></section>',  //分组结束标签

    'l1' => '<div class="sp-link-card">',  //链接开始标签
    'l2' => '<a '.$rel.' href="{link_url}" title="{link_name_text}" target="_blank" class="sp-link-item">
        <div class="sp-link-icon">{link_icon}</div>
        <div class="sp-link-info">
            <span class="sp-link-name">{link_name}</span>
        </div>
    </a>',  //链接内容
    'l3' => '</div>',  //链接结束标签
);
lists($html);
