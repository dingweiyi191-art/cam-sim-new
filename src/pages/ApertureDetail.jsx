import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 光圈知识详情 — 三级详情页（左侧260px侧边栏）
 */
export default function ApertureDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    const add = (e) => {
      const el = e.target.closest('[class*="active:shadow-none"]');
      if (!el) return;
      el.style.transform = 'translate(4px,4px)';
      el.style.boxShadow = 'none';
    };
    const rem = (e) => {
      const el = e.target.closest('[class*="active:shadow-none"]');
      if (!el) return;
      el.style.transform = '';
      el.style.boxShadow = '';
    };
    document.addEventListener('mousedown', add);
    document.addEventListener('mouseup', rem);
    document.addEventListener('mouseleave', rem);
    return () => {
      document.removeEventListener('mousedown', add);
      document.removeEventListener('mouseup', rem);
      document.removeEventListener('mouseleave', rem);
    };
  }, []);

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; background: #fbfbe3; }
        .page-wrapper {
          width: 1440px; max-width: 97vw; margin: 2px auto; padding: 2px;
          display: flex; flex-direction: column;
          transform: scale(0.94); transform-origin: top center;
          height: fit-content; min-height: 92vh; box-sizing: border-box;
          max-height: calc(100vh - 4px); overflow: hidden;
        }
        .pixel-border { border: 4px solid #1b1d0e; }
      `}</style>

      <div className="page-wrapper overflow-x-hidden bg-background shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b-2 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ padding: '0 80px', height: '30px' }}>
          <div className="font-headline-lg uppercase tracking-widest text-primary">PHOTO_SIM_V1.0</div>
          <nav className="hidden gap-6 md:flex">
            <a className="px-2 font-headline-md text-on-surface-variant hover:bg-surface-variant" href="#">SIMULATOR</a>
            <a className="px-2 font-headline-md text-on-surface-variant hover:bg-surface-variant" href="#">GALLERY</a>
            <a className="border-b-4 border-primary pb-0.5 font-headline-md text-primary" href="#">GUIDE</a>
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/knowledge-hub')}
              className="border-2 border-on-surface bg-surface px-2 py-0 font-label-caps text-on-surface transition-all hover:bg-primary-container hover:text-on-primary-container active:translate-x-0.5 active:translate-y-0.5"
            >
              ← 退出
            </button>
          </div>
        </header>

        {/* Body: Sidebar + Main */}
        <div className="flex flex-1 overflow-hidden gap-0">
          {/* Sidebar 260px */}
          <aside className="flex w-[260px] flex-shrink-0 flex-col border-r-4 border-on-background bg-surface-container-low py-0.5">
            <div className="mb-0.5 border-b-2 border-on-background p-1">
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center border-2 border-on-background bg-primary">
                  <span className="material-symbols-outlined text-on-primary">person</span>
                </div>
                <div>
                  <div className="font-headline-md text-on-surface">OPERATOR_01</div>
                  <div className="font-label-caps text-on-surface-variant">LVL_99_PHO</div>
                </div>
              </div>
            </div>
            <div className="space-y-0.5 px-1">
              <div className="mx-1 my-0.5 flex cursor-pointer items-center gap-2 border-2 border-on-background bg-secondary p-1 font-label-caps text-on-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>camera_exposure</span> APERTURE
              </div>
              <div className="mx-1 my-0.5 flex cursor-pointer items-center gap-2 p-1 font-label-caps text-on-surface-variant transition-transform hover:bg-secondary-container active:scale-95">
                <span className="material-symbols-outlined">shutter_speed</span> SHUTTER
              </div>
              <div className="mx-1 my-0.5 flex cursor-pointer items-center gap-2 p-1 font-label-caps text-on-surface-variant transition-transform hover:bg-secondary-container active:scale-95">
                <span className="material-symbols-outlined">iso</span> ISO
              </div>
              <div className="mx-1 my-0.5 flex cursor-pointer items-center gap-2 p-1 font-label-caps text-on-surface-variant transition-transform hover:bg-secondary-container active:scale-95">
                <span className="material-symbols-outlined">center_focus_strong</span> FOCUS
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-1 p-2">
              <button className="border-2 border-on-background bg-primary-container p-1 font-label-caps text-on-primary-container shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                EXPORT_FILM
              </button>
              <div className="mt-2 flex flex-col gap-0.5">
                <div className="flex cursor-pointer items-center gap-2 p-0.5 font-label-caps text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined">terminal</span> LOGS
                </div>
                <div className="flex cursor-pointer items-center gap-2 p-0.5 font-label-caps text-on-surface-variant hover:text-error">
                  <span className="material-symbols-outlined">power_settings_new</span> EXIT
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-grow overflow-hidden bg-background" style={{ minHeight: '78vh' }}>
            <div className="max-w-full p-2">
              {/* Breadcrumbs */}
              <div className="mb-1 flex items-center gap-2 font-label-caps text-outline">
                <span className="cursor-pointer hover:text-primary">GUIDES</span>
                <span>/</span>
                <span className="text-on-surface">APERTURE_SYSTEM.EXE</span>
              </div>

              {/* Window */}
              <div className="pixel-border relative overflow-hidden bg-surface-container-high shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                {/* Title Bar — ShutterDetail style */}
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className="border-2 border-on-background bg-primary-container p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="material-symbols-outlined text-[36px] text-on-primary-container">info</span>
                    </div>
                    <div>
                      <h1 className="font-headline-lg uppercase text-on-surface">光圈与景深 // APERTURE &amp; DOF</h1>
                      <div className="mt-0.5 h-1 w-24 bg-on-surface"></div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <div className="flex h-5 w-5 cursor-pointer items-center justify-center border-2 border-on-background bg-surface-container-highest">
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </div>
                    <div className="flex h-5 w-5 cursor-pointer items-center justify-center border-2 border-on-background bg-error">
                      <span className="material-symbols-outlined text-[14px] text-on-error">close</span>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  {/* Intro */}
                  <div className="mb-1 flex flex-col gap-2 lg:flex-row lg:items-stretch">
                    <div className="flex-1 space-y-1">
                      <div className="mb-1 inline-block border-2 border-on-background bg-secondary-container px-2 py-0.5">
                        <h2 className="font-headline-md text-on-secondary-container">什么是光圈?</h2>
                      </div>
                      <p className="font-body-lg leading-relaxed text-on-surface-variant">
                        光圈是镜头内部控制进光量的开孔装置，通常用 <span className="font-bold text-primary underline">f 值</span> 来表示。
                      </p>
                      <div className="space-y-0.5 border-2 border-on-background bg-surface p-1.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <span className="material-symbols-outlined text-on-primary">arrow_downward</span>
                          </div>
                          <div>
                            <span className="font-bold text-primary">f 值越小</span> (如 f/1.4) : <span className="text-on-surface">光圈开口越大，进光量越多。</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-outline">
                            <span className="material-symbols-outlined text-on-surface">arrow_upward</span>
                          </div>
                          <div>
                            <span className="font-bold text-outline">f 值越大</span> (如 f/16) : <span className="text-on-surface">光圈开口越小，进光量越少。</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex w-full flex-shrink-0 items-center justify-center overflow-hidden border-4 border-on-background bg-on-background p-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:w-[320px]" style={{ height: '170px' }}>
                      <img className="h-full w-full max-w-full object-contain" alt="Lens diagram"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLpHDkA83CSKw41XznZ4qe087WI0yuH9VoJgWFrhluJDhTOhHizo4wTdqJelT5DkvpiXV6YUItxdf_FA6f84bRHJc8fdKQTr6P3cy-1eb5KYD-Dmq45TpbtrXpduFfiVYgpLWK3pNrBxjjhoCvZmufnU0XEMl3HKTELiiRU28T2YICn9X5qjLzPN3rRuuObhD-MBAFQf4__hPCgoQGabQnboJSCVOMHSG6cLJEWHR28EueGEfl1BIbQ"
                      />
                      <div className="absolute bottom-1 right-1 bg-on-background px-2 py-0.5 font-label-caps text-primary-fixed-dim">LENS_DIAGRAM_01.BMP</div>
                    </div>
                  </div>

                  {/* Relationship */}
                  <div className="mb-1">
                    <div className="mb-1 inline-block border-2 border-on-background bg-tertiary-container px-2 py-0.5">
                      <h2 className="font-headline-md text-on-tertiary-container">光圈与景深的关系</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                      {/* Shallow DOF */}
                      <div className="flex flex-col border-4 border-on-background bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="border-b-2 border-on-background bg-secondary-fixed-dim p-1">
                          <div className="flex items-center justify-between">
                            <span className="font-headline-md">大光圈 (小 f 值)</span>
                            <span className="material-symbols-outlined">blur_on</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-0.5 p-1">
                          <div className="relative overflow-hidden border-2 border-on-background bg-on-background" style={{ height: '140px' }}>
                            <img
                              className="h-full w-full max-w-full object-cover"
                              src="/tutorial/APERTURE_WIDE_01.png?force"
                              loading="lazy"
                              alt="大光圈示例"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.background = '#fbfbe3';
                              }}
                            />
                            <div className="absolute right-1 top-1 bg-secondary px-2 font-label-caps text-on-secondary">f/1.8</div>
                          </div>
                          <ul className="space-y-1 font-body-lg">
                            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-primary"></span> 景深浅</li>
                            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-primary"></span> 背景虚化强</li>
                            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-primary"></span> 适合人像、特写</li>
                          </ul>
                        </div>
                      </div>
                      {/* Deep DOF */}
                      <div className="flex flex-col border-4 border-on-background bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="border-b-2 border-on-background bg-outline-variant p-1">
                          <div className="flex items-center justify-between">
                            <span className="font-headline-md">小光圈 (大 f 值)</span>
                            <span className="material-symbols-outlined">grid_view</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-0.5 p-1">
                          <div className="relative overflow-hidden border-2 border-on-background bg-on-background" style={{ height: '140px' }}>
                            <img className="h-full w-full max-w-full object-cover" alt="Deep DOF"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIqEIENQ4RZjEjKHb3bPJfFRMHh1fsYgr94ibTImXMTxHMlFzwOJyypS2ZOod4jWDpUKPYVmkBoFIzYjlv4XglaCrwWkg2ZAW2D4p6UVoW8AHiVeLaGoN5MTzEuHUWNfhnEC8aePTkEvT9e2xMA1TWmBBtiByZv1oT2VZKv3Ae6uOx3WAWzepLmElZVte60YZijzsCDTUa69leZoSLYgwopl4e2_BU9Fyrh-GKycMck9BZTpEDsbO5Cg"
                            />
                            <div className="absolute right-1 top-1 bg-outline px-2 font-label-caps text-on-surface">f/11</div>
                          </div>
                          <ul className="space-y-1 font-body-lg">
                            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-outline"></span> 景深大</li>
                            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-outline"></span> 前后景皆清晰</li>
                            <li className="flex items-center gap-2"><span className="h-2 w-2 bg-outline"></span> 适合风光、建筑</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mb-1 bg-on-background p-1" style={{ border: '2px solid #516600' }}>
                    <div className="mb-1 flex items-center gap-2">
                      <h2 className="font-headline-md uppercase text-primary-fixed-dim">常用光圈推荐 / RECOMMENDATIONS</h2>
                      <div className="h-1 flex-1 bg-primary-fixed-dim opacity-30"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        { scene: 'PORTRAIT', title: '人像拍摄', val: 'f/1.4 - f/2.8' },
                        { scene: 'STREET', title: '街头摄影', val: 'f/4 - f/5.6' },
                        { scene: 'LANDSCAPE', title: '风光摄影', val: 'f/8 - f/16' },
                        { scene: 'MACRO', title: '微距摄影', val: '根据需要调整' },
                      ].map((item, i) => (
                        <div key={i} className="group cursor-pointer border-2 border-on-background bg-surface-container-highest p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-primary-container active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                          <div className="font-label-caps text-outline group-hover:text-on-primary-container">SCENE: {item.scene}</div>
                          <div className="my-1 font-headline-md">{item.title}</div>
                          <div className="text-xl font-bold text-primary">{item.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-auto flex w-full items-center justify-between border-t-2 border-on-surface bg-surface-dim py-0.5" style={{ padding: '0 80px' }}>
          <div className="font-label-caps uppercase text-on-surface">©198X BIT_SENSING_CORP</div>
          <div className="flex gap-margin-md">
            <a className="font-body-sm text-on-surface-variant transition-colors duration-100 hover:text-primary" href="#">PRIVACY.SYS</a>
          </div>
        </footer>
      </div>
    </>
  );
}
