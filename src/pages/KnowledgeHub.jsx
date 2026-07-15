import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 知识学习枢纽 — 二级页面（左侧260px侧边栏）
 */
export default function KnowledgeHub() {
  const navigate = useNavigate();

  useEffect(() => {
    const mousedown = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      btn.classList.add('pixel-button-active');
    };
    const reset = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      btn.classList.remove('pixel-button-active');
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
      <style>{`
        html, body { margin: 0; padding: 0; background: #fbfbe3; }
        .page-outer {
          max-height: calc(100vh - 16px); overflow: hidden;
        }
        .page-wrapper {
          width: 1440px; max-width: 94vw; margin: 8px auto; padding: 8px;
          display: flex; flex-direction: column;
          transform: scale(0.88); transform-origin: top center;
          height: fit-content; box-sizing: border-box;
        }
        .dither-bg {
          background-image: radial-gradient(circle, #1b1d0e 1px, transparent 1px);
          background-size: 4px 4px;
        }
        button.pixel-button-active {
          box-shadow: none !important;
          transform: translate(4px, 4px);
        }
      `}</style>

      <div className="page-outer">
      <div className="page-wrapper overflow-x-hidden bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b-4 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between px-[80px] py-0.5">
            <div className="font-headline-md text-headline-md text-tertiary">CAM-SIM 8-BIT</div>
            <nav className="hidden gap-margin-md md:flex items-center">
              <a className="font-label-caps text-on-surface-variant hover:text-tertiary transition-colors" href="#">模拟器</a>
              <a className="font-label-caps text-primary border-b-4 border-primary hover:text-tertiary transition-colors" href="#">画廊</a>
              <a className="font-label-caps text-on-surface-variant hover:text-tertiary transition-colors" href="#">指南</a>
            </nav>
            <div className="flex gap-4 items-center">
              <span className="material-symbols-outlined text-primary cursor-pointer active:translate-y-0.5">settings</span>
              <span className="material-symbols-outlined text-primary cursor-pointer active:translate-y-0.5">account_circle</span>
            </div>
          </div>
        </header>

        {/* Body: Sidebar + Main */}
        <main className="mx-auto flex w-full flex-grow flex-row gap-2 overflow-hidden px-[80px] py-2">
          {/* Sidebar 260px */}
          <aside className="flex h-fit w-[260px] flex-shrink-0 flex-col gap-1 border-4 border-on-surface bg-surface-container p-2">
            <div className="mb-2 flex flex-col gap-1 border-b-2 border-on-surface pb-2">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-on-surface bg-primary-container">
                <span className="material-symbols-outlined text-on-primary-container">person</span>
              </div>
              <div>
                <div className="font-label-caps text-primary">操作员_01</div>
                <div className="font-body-sm text-on-surface-variant">5级摄影师</div>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <button className="flex items-center gap-2 p-1.5 font-label-caps text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container transition-all">
                <span className="material-symbols-outlined">camera</span> 光圈
              </button>
              <button className="flex items-center gap-2 p-1.5 font-label-caps text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container transition-all">
                <span className="material-symbols-outlined">shutter_speed</span> 快门
              </button>
              <button className="flex items-center gap-2 p-1.5 font-label-caps text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container transition-all">
                <span className="material-symbols-outlined">iso</span> 感光度
              </button>
              <button className="flex items-center gap-2 p-1.5 font-label-caps bg-primary-container text-on-primary-container border-2 border-on-surface translate-x-1 translate-y-1">
                <span className="material-symbols-outlined">center_focus_strong</span> 对焦
              </button>
            </nav>
            <button
              onClick={() => navigate('/')}
              className="mt-4 border-2 border-on-surface bg-primary p-1.5 font-label-caps text-on-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              ← 返回首页
            </button>
          </aside>

          {/* Main Content */}
          <section className="flex-grow">
            <div className="mb-1">
              <h1 className="mb-0.5 max-w-fit font-headline-lg uppercase text-primary">知识学习中心.EXE</h1>
              <p className="max-w-2xl font-body-lg text-on-surface-variant">通过交互式学习模块，掌握 8-bit 光学的基础知识。</p>
            </div>

            {/* 2x2 Bento Grid */}
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
              {/* Card 1: Aperture → /aperture */}
              <div
                onClick={() => navigate('/aperture')}
                className="flex cursor-pointer flex-col overflow-hidden border-4 border-on-surface bg-surface-container-high shadow-[6px_6px_0px_0px_#1b1d0e]"
              >
                <div className="window-header flex items-center justify-between border-b-4 border-on-surface px-3 py-1">
                  <span className="font-label-caps text-on-primary">光圈模拟.SIM</span>
                  <div className="flex gap-1">
                    <button className="flex h-5 w-5 items-center justify-center border-2 border-on-surface bg-surface text-xs font-bold transition-colors hover:bg-error hover:text-white">X</button>
                  </div>
                </div>
                <div className="flex h-full flex-col p-2">
                  <div className="group relative mb-1 overflow-hidden border-2 border-on-surface bg-on-surface-variant" style={{ aspectRatio: '16/9', maxHeight: '130px' }}>
                    <img className="h-full w-full max-w-full object-cover" alt="浅景深预览"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY_DeQlK2xOnYXUV2eCmNHpcN3GbsNxS6m0CyNxSYecltuJItOgiZ1orkSQ419pxKbH02VbEKV13UIBrP6g1JqIfrOlWV6AAT1zNpRqOd66rwvMpK7CeMpGomOLdYl3ixlqt3QJbXkhaAbQAlFN1_2ri8CF7NI4O9-7sqcQhAHQnD5ZHmljTisW_rNkRnC35PVHtOZr-uXsEpfy3K27Prh5rvmdnAgu02cBFHsoGnp89-FK_MQvOZD4g" />
                    <div className="pointer-events-none absolute inset-0 dither-bg opacity-20"></div>
                    <div className="absolute bottom-1 left-1 bg-on-surface px-2 py-0.5 text-[10px] uppercase text-surface font-label-caps">预览：浅景深</div>
                  </div>
                  <h3 className="mb-0.5 font-headline-md text-on-surface">光圈</h3>
                  <p className="mb-1 font-body-sm">光圈控制镜头"瞳孔"的大小。较大的开口（f/1.8）会产生模糊的背景，将注意力集中在拍摄对象上。</p>
                  <div className="mt-auto flex items-center justify-between border-t-2 border-on-surface pt-1">
                    <span className="font-label-caps text-tertiary">状态：就绪</span>
                    <button className="border-2 border-on-surface bg-primary-container px-3 py-0.5 font-label-caps text-on-primary-container shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1">了解更多</button>
                  </div>
                </div>
              </div>

              {/* Card 2: Shutter Speed → /shutter */}
              <div
                onClick={() => navigate('/shutter')}
                className="flex cursor-pointer flex-col overflow-hidden border-4 border-on-surface bg-surface-container-high shadow-[6px_6px_0px_0px_#1b1d0e]"
              >
                <div className="window-header flex items-center justify-between border-b-4 border-on-surface px-3 py-1">
                  <span className="font-label-caps text-on-primary">快门系统.SYS</span>
                  <div className="flex gap-1">
                    <button className="flex h-5 w-5 items-center justify-center border-2 border-on-surface bg-surface text-xs font-bold transition-colors hover:bg-error hover:text-white">X</button>
                  </div>
                </div>
                <div className="flex h-full flex-col p-2">
                  <div className="group relative mb-1 overflow-hidden border-2 border-on-surface bg-on-surface-variant" style={{ aspectRatio: '16/9', maxHeight: '130px' }}>
                    <img className="h-full w-full max-w-full object-cover" alt="动态模糊预览"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD065xolEkCkMTExUXWAhcTyqU-YOT3KPp9bXnp9iIncN5Y3jW2HRvkdq8GZQUd6OxwsSJyCwt1A6USgNhXddBqnEML-BNiR-IUsqayKOaOA5UIqGTT6vmPv5Qp5d-ErVth23mFBu1h24J2TTPInepT9NQQ-Hi9YFKrhaN8Uma3UVywCX2-fDmeU9zGc_k7SqEqbX05Pqt3T80Fmtp6ekqs7pau1SvTMvczjBK5P9w5PlSoISmNhLlE8w" />
                    <div className="pointer-events-none absolute inset-0 dither-bg opacity-20"></div>
                    <div className="absolute bottom-1 left-1 bg-on-surface px-2 py-0.5 text-[10px] uppercase text-surface font-label-caps">预览：动态模糊</div>
                  </div>
                  <h3 className="mb-1 font-headline-md text-on-surface">快门</h3>
                  <p className="mb-1 font-body-sm">快门速度决定了传感器观察场景的时间。慢速（1/10s）会将动作拖成光轨；快速（1/1000s）可以冻结时间。</p>
                  <div className="mt-auto flex items-center justify-between border-t-2 border-on-surface pt-1">
                    <span className="font-label-caps text-tertiary">状态：就绪</span>
                    <button className="border-2 border-on-surface bg-primary-container px-3 py-0.5 font-label-caps text-on-primary-container shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1">了解更多</button>
                  </div>
                </div>
              </div>

              {/* Card 3: ISO → /iso */}
              <div
                onClick={() => navigate('/iso')}
                className="flex cursor-pointer flex-col overflow-hidden border-4 border-on-surface bg-surface-container-high shadow-[6px_6px_0px_0px_#1b1d0e]"
              >
                <div className="window-header flex items-center justify-between border-b-4 border-on-surface px-3 py-1">
                  <span className="font-label-caps text-on-primary">感光度噪点.EXE</span>
                  <div className="flex gap-1">
                    <button className="flex h-5 w-5 items-center justify-center border-2 border-on-surface bg-surface text-xs font-bold transition-colors hover:bg-error hover:text-white">X</button>
                  </div>
                </div>
                <div className="flex h-full flex-col p-2">
                  <div className="group relative mb-1 overflow-hidden border-2 border-on-surface bg-on-surface-variant" style={{ aspectRatio: '16/9', maxHeight: '130px' }}>
                    <img className="h-full w-full max-w-full object-cover" alt="感光器噪点预览"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-KxY8oKuQDR8CuiGQMZQTS9SOSOa-ugO148FnCVLWGK8YjA1K0O7qellqalEvL8TtLduGpfsXcReIoqt8WzgK9uyWgNq__KxdcY_KynZt4Q2P2uEirC1sBBROEoBFYNvSI9fKu_C7s6idBmR3T3vxurKwSCGjQFcn3tKA6r935tskrvobQw6C6KeM97xpoqRcESTT3hcDrdc6gPJLUMPUJhCToi783ATDoVUFdBjx-J4rOtsyPM71oA" />
                    <div className="pointer-events-none absolute inset-0 dither-bg opacity-40"></div>
                    <div className="absolute bottom-1 left-1 bg-on-surface px-2 py-0.5 text-[10px] uppercase text-surface font-label-caps">预览：感光器噪点</div>
                  </div>
                  <h3 className="mb-1 font-headline-md text-on-surface">感光度</h3>
                  <p className="mb-1 font-body-sm">ISO是数字胶片的灵敏度。较高的ISO（3200+）能让你在黑暗中看清，但也会给照片增加"数字颗粒"或噪点。</p>
                  <div className="mt-auto flex items-center justify-between border-t-2 border-on-surface pt-1">
                    <span className="font-label-caps text-tertiary">状态：就绪</span>
                    <button className="border-2 border-on-surface bg-primary-container px-3 py-0.5 font-label-caps text-on-primary-container shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1">了解更多</button>
                  </div>
                </div>
              </div>

              {/* Card 4: Knowledge Test → /quiz */}
              <div
                onClick={() => navigate('/quiz')}
                className="flex cursor-pointer flex-col overflow-hidden border-4 border-on-surface bg-surface-container-high shadow-[6px_6px_0px_0px_#1b1d0e]"
              >
                <div className="window-header flex items-center justify-between border-b-4 border-on-surface px-3 py-1">
                  <span className="font-label-caps text-on-primary">知识检测_V1</span>
                  <div className="flex gap-1">
                    <button className="flex h-5 w-5 items-center justify-center border-2 border-on-surface bg-surface text-xs font-bold transition-colors hover:bg-error hover:text-white">X</button>
                  </div>
                </div>
                <div className="flex h-full flex-col p-2">
                  <div className="group relative mb-1 overflow-hidden border-2 border-on-surface bg-on-surface-variant" style={{ aspectRatio: '16/9', maxHeight: '130px' }}>
                    <img className="h-full w-full max-w-full object-cover" alt="测验预览"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlL-gwOhEbigtVtRMJDA5aZj2OLSJStBaFT20PfpNVY3IuqbjFLzb0dZ875jPAiQasx65sP46WAIMGSQbuNWU1CtUBTAguYrjEhj5vBOGsf_Av6Vg5EKl4Dt7bo8ircv9lWiZ-fsNmUKCRzNcfXOeWhSAmXBgdOQOU9Ta2mw_C6XIHjazMKHR8T2BrtfmuKgioD23mW5YsxEeAN-GfrOtRSlFAjpRfhwiSpzPtFd_n2S7c8fmz70-w-g" />
                    <div className="pointer-events-none absolute inset-0 dither-bg opacity-20"></div>
                    <div className="absolute bottom-1 left-1 bg-on-surface px-2 py-0.5 text-[10px] uppercase text-surface font-label-caps">预览：测验</div>
                  </div>
                  <h3 className="mb-1 font-headline-md text-on-surface">知识检测</h3>
                  <p className="mb-1 font-body-sm">通过一系列挑战来测试你对 8-bit 光学原理的理解。</p>
                  <div className="mt-auto flex items-center justify-between border-t-2 border-on-surface pt-1">
                    <span className="font-label-caps text-tertiary">状态：就绪</span>
                    <button className="border-2 border-on-surface bg-primary-container px-3 py-0.5 font-label-caps text-on-primary-container shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1">提交</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto w-full border-t-2 border-primary bg-on-surface text-surface">
          <div className="mx-auto flex flex-col items-center px-[80px] py-1 md:flex-row md:justify-between">
            <div className="mb-1 font-body-sm opacity-70 md:mb-0">©1989 像素光学系统 (PIXEL-OPTICS SYSTEMS). 版权所有。</div>
            <div className="flex gap-gutter">
              <a className="font-label-caps text-surface-variant hover:text-secondary-fixed transition-all" href="#">隐私政策.EXE</a>
              <a className="font-label-caps text-surface-variant hover:text-secondary-fixed transition-all" href="#">使用条款.BAT</a>
              <a className="font-label-caps text-surface-variant hover:text-secondary-fixed transition-all" href="#">联系我们.SYS</a>
            </div>
            <div className="mt-1 font-label-caps text-primary-fixed md:mt-0">V.1.0.4-稳定版</div>
          </div>
        </footer>
      </div>
      </div>
    </>
  );
}
