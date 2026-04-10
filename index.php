<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo $conf['title'] ?></title>
	<meta name="keywords" content="<?php echo $conf['keywords'] ?>">
	<meta name="description" content="<?php echo $conf['description'] ?>">
	<meta name="author" content="LyLme">
	<link rel="icon" href="<?php echo $conf['logo'] ?>" type="image/x-icon">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-touch-fullscreen" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="full-screen" content="yes">
	<meta name="browsermode" content="application">
	<meta name="x5-fullscreen" content="true">
	<meta name="x5-page-mode" content="app">
	<meta name="lsvn" content="<?php echo base64_encode($conf['version']) ?>">
	<script src="<?php echo $cdnpublic ?>/assets/js/jquery.min.js" type="application/javascript"></script>
	<link href="<?php echo $cdnpublic ?>/assets/css/bootstrap.min.css" type="text/css" rel="stylesheet">
	<link rel="stylesheet" href="<?php echo $templatepath; ?>/css/style.css?v=20250410" type="text/css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>

<body>
	<!-- 背景层 -->
	<div class="sp-bg-layer">
		<?php if (!empty(background())) : ?>
			<img src="<?php echo background(); ?>" alt="">
		<?php endif; ?>
		<div class="sp-bg-gradient"></div>
		<div class="sp-bg-stars" id="spBgStars"></div>
		<!-- 鼠标跟随光效 -->
		<div class="sp-cursor-glow" id="spCursorGlow"></div>
	</div>

	<!-- 侧边分类导航 -->
	<div class="sp-sidebar" id="spSidebar">
		<button class="sp-sidebar-toggle" id="spSidebarToggle" aria-label="切换导航">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="3" y1="6" x2="21" y2="6"></line>
				<line x1="3" y1="12" x2="21" y2="12"></line>
				<line x1="3" y1="18" x2="21" y2="18"></line>
			</svg>
		</button>
		<nav class="sp-sidebar-nav" id="spSidebarNav">
			<ul>
				<li class="active" data-lylme="search">
					<a href="#search">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
						<span>搜索</span>
					</a>
				</li>
				<?php
				$groups = $site->getGroups();
				$colorIndex = 0;
				$accentColors = ['#4F7CFF', '#818CF8', '#34D399', '#38BDF8', '#FB923C', '#F472B6', '#A78BFA', '#4ADE80'];
				while ($group = $DB->fetch($groups)) {
					$color = $accentColors[$colorIndex % count($accentColors)];
					echo '<li data-lylme="group_' . $group["group_id"] . '" style="--accent: ' . $color . '">
						<a href="#group_' . $group["group_id"] . '">
							' . $group["group_icon"] . '
							<span>' . $group["group_name"] . '</span>
						</a>
					</li>' . "\n";
					$colorIndex++;
				}
				?>
			</ul>
		</nav>
	</div>

	<!-- 顶部导航栏 -->
	<header class="sp-header" id="spHeader">
		<div class="sp-header-inner">
			<div class="sp-header-left">
				<a class="sp-logo" href="/">
					<?php if (!empty($conf['logo'])) : ?>
						<img src="<?php echo $conf['logo']; ?>" alt="灯塔导航" height="32">
					<?php else : ?>
						<svg class="sp-logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
							<path d="M12 6v6l4 2"></path>
							<circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"></circle>
						</svg>
					<?php endif; ?>
					<span class="sp-logo-text">灯塔导航</span>
				</a>
			</div>
			<nav class="sp-header-nav">
				<?php
				$tagslists = $site->getTags();
				$filteredTags = array();
				$aboutTag = null;
				while ($taglists = $DB->fetch($tagslists)) {
					$name = $taglists["tag_name"];
					// 过滤掉"申请收录"和"访问管理"
					if ($name === '申请收录' || $name === '访问管理') {
						continue;
					}
					// 记录"关于本站"稍后处理
					if ($name === '关于本站') {
						$aboutTag = $taglists;
						continue;
					}
					$filteredTags[] = $taglists;
				}
				// 输出过滤后的导航
				foreach ($filteredTags as $taglists) {
					echo '<a class="sp-nav-link" href="' . $taglists["tag_link"] . '"';
					if ($taglists["tag_target"] == 1) {
						echo ' target="_blank"';
					}
					echo '>' . $taglists["tag_name"] . '</a>';
				}
				// 添加"灯塔生态"锚点链接
				echo '<a class="sp-nav-link" href="#group_8">灯塔生态</a>';
				// 输出"关于"（原"关于本站"）
				if ($aboutTag) {
					echo '<a class="sp-nav-link" href="' . $aboutTag["tag_link"] . '"';
					if ($aboutTag["tag_target"] == 1) {
						echo ' target="_blank"';
					}
					echo '>关于</a>';
				}
				?>
			</nav>
			<div class="sp-header-right">
				<div class="sp-datetime" id="spDatetime">
					<div class="sp-time" id="spTime"></div>
					<div class="sp-date" id="spDate"></div>
				</div>
				<button class="sp-mobile-menu-btn" id="spMobileMenuBtn" aria-label="菜单">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				</button>
			</div>
		</div>
	</header>

	<!-- 主内容区 -->
	<main class="sp-main">
		<!-- Hero 搜索区 -->
		<section class="sp-hero" id="search">
			<div class="sp-hero-glow"></div>
			<div class="sp-hero-particles" id="spHeroParticles"></div>
			<div class="sp-hero-content sp-animate-in">
				<?php
				echo theme_config('home_title');
				if ($conf['yan'] == 'true') {
					echo '<p class="sp-hero-quote">' . yan() . '</p>';
				}
				?>

				<!-- 搜索引擎切换 -->
				<div class="sp-search-engines" id="spSearchEngines">
					<?php
					$soulists = $site->getSou();
					while ($soulist = $DB->fetch($soulists)) {
						if ($soulist["sou_st"] == 1) {
							$searchUrl = (checkmobile() && !empty($soulist["sou_waplink"])) ? $soulist["sou_waplink"] : $soulist["sou_link"];
							echo '<button class="sp-engine-btn" 
								data-url="' . $searchUrl . '" 
								data-placeholder="' . $soulist["sou_hint"] . '"
								data-name="' . $soulist["sou_name"] . '"
								data-color="' . $soulist["sou_color"] . '">
								' . $soulist["sou_icon"] . '
								<span style="color:' . $soulist["sou_color"] . '">' . $soulist["sou_name"] . '</span>
							</button>';
						}
					}
					?>
				</div>

				<!-- 搜索框（带旋转边框动画） -->
				<div class="sp-search-box" id="spSearchBox">
					<div class="sp-search-border-glow"></div>
					<form action="https://www.bing.com/search?q=" method="get" target="_blank" id="super-search-fm" class="sp-search-form">
						<div class="sp-search-input-wrap" id="spSearchInputWrap">
							<!-- 旋转边框动画层 -->
							<div class="sp-search-rotate-border" id="spSearchRotateBorder">
								<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="spBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
											<stop offset="0%" stop-color="#4F7CFF" stop-opacity="0"/>
											<stop offset="25%" stop-color="#4F7CFF" stop-opacity="1"/>
											<stop offset="50%" stop-color="#6366F1" stop-opacity="1"/>
											<stop offset="75%" stop-color="#818CF8" stop-opacity="1"/>
											<stop offset="100%" stop-color="#818CF8" stop-opacity="0"/>
										</linearGradient>
									</defs>
									<rect x="2" y="2" width="196" height="196" rx="98" ry="98" fill="none" stroke="url(#spBorderGrad)" stroke-width="2"/>
								</svg>
							</div>
							<svg class="sp-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="11" cy="11" r="8"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg>
							<input type="text" id="search-text" placeholder="搜索一下" name="q" autocomplete="off">
							<button class="sp-search-btn" type="submit">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</button>
						</div>
						<ul id="word" class="sp-suggestions" style="display: none;"></ul>
					</form>
				</div>

				<div class="sp-search-options">
					<label class="sp-option-label">
						<input type="checkbox" id="set-search-blank" class="sp-option-checkbox" checked autocomplete="off">
						<span class="sp-option-switch"></span>
						<span>新窗口打开</span>
					</label>
				</div>
			</div>
		</section>

		<!-- 今日热榜（搜索栏下方） -->
		<?php
		if (theme_config('lytoday', 0) == 1) {
			echo '<div class="sp-section">' . theme_config('lytodaycode') . '</div>';
		}
		?>

		<!-- 网站链接列表 -->
		<?php include "list.php"; ?>

		<!-- 今日热榜（底部） -->
		<?php
		if (theme_config('lytoday', 0) == 2) {
			echo '<div class="sp-section">' . theme_config('lytodaycode') . '</div>';
		}
		?>
	</main>

	<!-- 页脚 -->
	<?php include "footer.php"; ?>
