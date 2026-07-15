import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * CAM-SIM 首页 — 一级首页（无侧边栏）
 */
export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 原生 JS 交互：retro 像素按钮按下位移效果
    const mousedown = (e) => {
      const el = e.target.closest('button, .group');
      if (!el) return;
      if (
        el.classList.contains('shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]')
      ) {
        el.style.transform = 'translate(4px, 4px)';
        el.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,1)';
      } else if (
        el.classList.contains('shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]')
      ) {
        el.style.transform = 'translate(3px, 3px)';
        el.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,1)';
      } else if (
        el.classList.contains('shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]')
      ) {
        el.style.transform = 'translate(2px, 2px)';
        el.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,1)';
      }
    };
    const reset = (e) => {
      const el = e.target.closest('button, .group');
      if (!el) return;
      el.style.transform = '';
      el.style.boxShadow = '';
    };
    document.addEventListener('mousedown', mousedown);
    document.addEventListener('mouseup', reset);
    document.addEventListener('mouseleave', reset);
    return () => {
      document.removeEventListener('mousedown', mousedown);
      document.removeEventListener('mouseup', reset);
      document.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <>
      {/* ===== 像素复古补充样式 ===== */}
      <style>{`
        /* 确保 body 背景与首页统一浅米色，禁止双向滚动 */
        html, body {
          margin: 0;
          padding: 0;
          background: #fbfbe3;
          overflow: hidden;
        }
        /* 像素化图片渲染（Chrome/Edge/Firefox） */
        .pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        /* dither 纹理背景 */
        .dither-bg {
          background-image: radial-gradient(circle, #1b1d0e 1px, transparent 1px);
          background-size: 4px 4px;
        }
        /* 外层容器：1440px / 94vw / 整体缩至92% / 一屏无滚动 */
        .page-wrapper {
          width: 1440px;
          max-width: 94vw;
          margin: 12px auto;
          padding: 12px;
          display: flex;
          flex-direction: column;
          transform: scale(0.92);
          transform-origin: top center;
        }
      `}</style>

      {/* ========== 外层容器：1440px / 92vw / margin:24px auto ========== */}
      <div className="page-wrapper overflow-x-hidden bg-background">
        {/* ========== TopAppBar ========== */}
        <header className="sticky top-0 z-50 w-full border-b-4 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex w-full items-center justify-between px-[80px] py-1">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-headline-md text-primary">
                camera
              </span>
              <h1 className="font-headline-md text-headline-md text-tertiary">
                CAM-SIM 8-BIT
              </h1>
            </div>
            <nav className="hidden gap-8 md:flex"></nav>
          </div>
        </header>

        {/* ========== 主体：全屏主内容（无侧边栏）========== */}
        <main className="relative flex-grow overflow-hidden px-[80px] py-1">
            <div className="pointer-events-none absolute inset-0 z-0 pixel-overlay"></div>

            {/* ===== Hero Section ===== */}
            <section className="relative z-10 mb-2 flex flex-col items-center gap-3 overflow-hidden border-4 border-on-surface bg-surface-container p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:flex-row">
              <div className="max-w-[600px] flex-1 space-y-2">
                <div className="inline-block border-2 border-on-surface bg-secondary px-4 py-0.5 font-label-caps text-label-caps text-on-secondary">
                  系统启动中... V1.0.8
                </div>
                <h2 className="font-headline-lg uppercase leading-tight md:text-headline-lg">
                  掌握 <span className="text-primary">8-BIT 光学艺术</span>
                </h2>
                <p className="font-body-lg">
                  进入像素级的复古手动相机模拟器。通过我们的高保真模拟系统，学习光线、对焦和曝光的核心原理。
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="border-4 border-on-surface bg-primary-container px-6 py-2 font-headline-md text-on-primary-container shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95">
                    初始化系统
                  </button>
                  <button className="border-4 border-on-surface bg-surface px-6 py-2 font-headline-md text-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95">
                    阅读手册
                  </button>
                </div>
              </div>
              <div className="relative flex aspect-square w-full max-w-[280px] flex-1 items-center justify-center">
                <div className="absolute inset-0 scale-90 rounded-full dither-bg"></div>
                <div className="relative z-10 flex h-full w-full items-center justify-center p-2">
                  <img
                    className="pixelated h-full w-full max-w-full object-contain"
                    alt="像素风格复古相机"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtJ3EO5uZLyZYgBhSE1VR69yPOfPhlibdxxJbTiJTDTlxCGbR2taEAgwwiOnen7b--GB1a_xanSsrsF3Dn2pTNLNmxFWzK4A4ct2PRClY9tFTVKltFziFiFK2ihEm9DtQ-yTwsD3aa0E8BiyE9pw1tFL-1Oe4UQO3RYCpXdv2ROustACUJAHhuPmjHA6MKuSQAQvvjGAV8ElDFTEIZuxxIFvNjBjmLHasNLdQiuq4ZQY0ymgb1dJ4SUw"
                  />
                </div>
              </div>
            </section>

            {/* ===== Navigation Cards Grid ===== */}
            <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Knowledge Hub Card */}
              <div
                onClick={() => navigate('/knowledge-hub')}
                className="group h-fit cursor-pointer border-4 border-on-surface bg-surface p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[36px] text-tertiary">
                      menu_book
                    </span>
                    <div className="border-2 border-on-surface bg-outline-variant px-2 py-0.5 font-label-caps text-label-caps">
                      模块_01
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline-md uppercase">知识学习中心</h3>
                    <p className="font-headline-md text-on-surface-variant opacity-70">知识学习</p>
                  </div>
                  <p className="min-h-[32px] font-body-sm">
                    解开暗房的秘密。通过互动数字卷轴掌握光圈、快门速度和感光度。
                  </p>
                  <div className="mt-2 h-2 w-full bg-on-surface">
                    <div className="h-full w-[45%] bg-primary-container transition-all group-hover:w-[60%]"></div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-label-caps">进度: 45%</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>

              {/* Scene Simulator Card → /scene-simulator */}
              <div
                onClick={() => navigate('/scene-simulator')}
                className="group h-fit cursor-pointer border-4 border-on-surface bg-surface p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[36px] text-primary">
                      camera_front
                    </span>
                    <div className="border-2 border-on-surface bg-outline-variant px-2 py-0.5 font-label-caps text-label-caps">
                      模块_02
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline-md uppercase">场景模拟器</h3>
                    <p className="font-headline-md text-on-surface-variant opacity-70">场景模拟</p>
                  </div>
                  <p className="min-h-[32px] font-body-sm">
                    实时曝光引擎。在各种像素艺术场景中练习构图和光影管理。
                  </p>
                  <div className="mt-2 h-2 w-full bg-on-surface">
                    <div className="h-full w-[15%] bg-tertiary-container transition-all group-hover:w-[30%]"></div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-label-caps">已锁定: 需要 2 级</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                      lock
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Quick Status Component ===== */}
            <div className="mt-2 flex max-w-full flex-col items-center gap-2 border-4 border-on-surface bg-inverse-surface p-2 text-inverse-on-surface md:flex-row md:justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden border-2 border-primary-fixed bg-on-surface">
                  <img
                    className="pixelated h-full w-full object-cover"
                    alt="操作员头像"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPp_qN7XulmKGjRAgbRGqfJvXYwg2N3VYSsckiApkq8vGbcbWK9PqmfV7Kes6XsKoJr939UgcFmpmFuEnNX6JmnDYBk_m_Z5bxxr0JpiYdU7SyHmciNBoEDFIlUT-swuyCgnT8oaZ6mD0cQHQY3bkQce8HlQx6X04vakb1i_XwtdOEmtx8JoMPa9ZgUYZykwjKfzV1UUpOvIAv8QysseCbNKZ17a36fg9ZRj8Xp0plQ1uaNuuqKD-vyQ"
                  />
                </div>
                <div>
                  <p className="font-label-caps text-primary-fixed">操作员_01</p>
                  <p className="font-body-sm opacity-80">5 级摄影师 · 128 XP 距离下一级所需经验</p>
                </div>
              </div>
              <div className="flex w-full gap-gutter overflow-x-auto md:w-auto md:justify-end">
                <div className="flex min-w-[80px] flex-col items-center">
                  <span className="font-label-caps">剩余底片</span>
                  <div className="mt-1 flex gap-1">
                    <div className="h-3 w-3 border border-on-surface bg-primary-container"></div>
                    <div className="h-3 w-3 border border-on-surface bg-primary-container"></div>
                    <div className="h-3 w-3 border border-on-surface bg-primary-container"></div>
                    <div className="h-3 w-3 border border-surface-variant bg-on-surface"></div>
                  </div>
                </div>
                <div className="flex min-w-[80px] flex-col items-center">
                  <span className="font-label-caps">电量</span>
                  <div className="relative mt-1 h-3 w-12 border border-primary-fixed">
                    <div className="absolute inset-y-0 left-0 w-[85%] bg-primary-fixed"></div>
                  </div>
                </div>
              </div>
            </div>
        </main>

        {/* ========== Footer ========== */}
        <footer className="mt-auto w-full border-t-2 border-primary bg-on-surface text-surface">
          <div className="flex w-full flex-col items-center gap-2 px-[80px] py-1 md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:items-start">
              <span className="mb-1 font-label-caps text-primary-fixed">
                像素光学系统 (PIXEL-OPTICS SYSTEMS)
              </span>
              <p className="font-body-sm text-surface-variant">
                ©1989 PIXEL-OPTICS SYSTEMS. 保留所有权利。
              </p>
            </div>
            <div className="flex gap-6">
              <a className="font-body-sm text-surface-variant underline decoration-2 transition-all hover:text-secondary-fixed" href="#">
                隐私政策.EXE
              </a>
              <a className="font-body-sm text-surface-variant underline decoration-2 transition-all hover:text-secondary-fixed" href="#">
                服务条款.BAT
              </a>
              <a className="font-body-sm text-surface-variant underline decoration-2 transition-all hover:text-secondary-fixed" href="#">
                联系我们.SYS
              </a>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse bg-primary-container"></div>
              <span className="font-label-caps">系统在线</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
