import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 快门知识详情 — 三级详情页（左侧260px侧边栏）
 */
export default function ShutterDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    const add = (e) => {
      const el = e.target.closest('[class*="active:shadow-none"]');
      if (!el) return;
      el.style.transform = 'translate(2px,2px)';
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
          width: 1440px; max-width: 96vw; margin: 2px auto; padding: 2px;
          display: flex; flex-direction: column;
          transform: scale(0.94); transform-origin: top center;
          height: fit-content; box-sizing: border-box;
          max-height: calc(100vh - 6px); overflow: hidden;
        }
        .pixel-border { border: 2px solid #1b1d0e; }
      `}</style>

      <div className="page-wrapper overflow-x-hidden bg-surface">
        {/* Header */}
        <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b-2 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ padding: '0 80px', height: '30px' }}>
          <div className="font-headline-lg uppercase tracking-widest text-primary">PHOTO_SIM_V1.0</div>
          <nav className="hidden gap-margin-md md:flex h-full items-center">
            <a className="flex h-full items-center px-3 font-headline-md text-on-surface-variant hover:bg-surface-variant active:translate-x-0.5 active:translate-y-0.5" href="#">SIMULATOR</a>
            <a className="flex h-full items-center px-3 font-headline-md text-on-surface-variant hover:bg-surface-variant active:translate-x-0.5 active:translate-y-0.5" href="#">GALLERY</a>
            <a className="flex h-full items-center border-b-4 border-primary pb-0.5 font-headline-md text-primary" href="#">GUIDE</a>
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

        {/* Body */}
        <div className="flex flex-grow flex-row overflow-hidden" style={{ padding: '0 80px' }}>
          {/* Sidebar 260px */}
          <aside className="flex w-[260px] flex-shrink-0 flex-col gap-1 border-r-2 border-on-surface bg-surface-container py-1">
            <div className="border-b-2 border-on-surface p-2">
              <div className="font-headline-md text-on-surface">OPERATOR_01</div>
              <div className="font-body-sm text-primary opacity-70">SYSTEM_ACTIVE</div>
            </div>
            <div className="flex flex-grow flex-col gap-1">
              <button className="flex items-center gap-2 p-2 font-body-lg uppercase text-on-surface-variant transition-all hover:bg-surface-variant">
                <span className="material-symbols-outlined">exposure</span> APERTURE
              </button>
              <button className="flex items-center gap-2 border-2 border-on-surface bg-primary-container p-2 font-body-lg uppercase text-on-primary-container shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5">
                <span className="material-symbols-outlined">shutter_speed</span> SHUTTER
              </button>
              <button className="flex items-center gap-2 p-2 font-body-lg uppercase text-on-surface-variant transition-all hover:bg-surface-variant">
                <span className="material-symbols-outlined">iso</span> ISO
              </button>
              <button className="flex items-center gap-2 p-2 font-body-lg uppercase text-on-surface-variant transition-all hover:bg-surface-variant">
                <span className="material-symbols-outlined">center_focus_strong</span> FOCUS
              </button>
            </div>
            <div className="mt-auto flex flex-col gap-1 border-t-2 border-on-surface pt-2">
              <button className="mb-2 border-2 border-on-surface bg-primary p-2 font-headline-md text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">INITIATE_CAPTURE</button>
              <button className="flex items-center gap-2 p-1 font-body-sm text-on-surface-variant hover:text-error">
                <span className="material-symbols-outlined">logout</span> LOGOUT
              </button>
              <button className="flex items-center gap-2 p-1 font-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined">terminal</span> SYSTEM
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-grow overflow-hidden p-2">
            <div style={{ maxWidth: '1000px' }}>
              {/* Title */}
              <div className="mb-2">
                <div className="mb-1 flex items-center gap-3">
                  <div className="border-2 border-on-surface bg-primary-container p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="material-symbols-outlined text-[36px] text-on-primary-container">shutter_speed</span>
                  </div>
                  <div>
                    <h1 className="font-headline-lg uppercase text-on-surface">快门与动态 // SHUTTER &amp; MOTION</h1>
                    <div className="mt-0.5 h-1 w-24 bg-on-surface"></div>
                  </div>
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 gap-1 md:grid-cols-12">
                {/* Definition */}
                <section className="group relative overflow-hidden p-2 pixel-border md:col-span-12 bg-surface-container-low">
                  <div className="absolute right-0 top-0 p-1 opacity-5 transition-opacity group-hover:opacity-15">
                    <span className="material-symbols-outlined text-[80px]">timer</span>
                  </div>
                  <h2 className="mb-1 flex items-center gap-2 font-headline-md text-secondary">
                    <span className="h-3 w-3 bg-secondary"></span> 什么是快门速度?
                  </h2>
                  <p className="relative z-10 max-w-3xl font-body-lg leading-relaxed">
                    快门速度是相机感光元件暴露在光线下时间长度。用秒或分数表示，如 <span className="border border-on-surface bg-primary-container px-2 py-0.5">1/1000s</span>（千分之一秒）、<span className="border border-on-surface bg-primary-container px-2 py-0.5">1s</span>（一秒）。
                  </p>
                </section>

                {/* High Speed */}
                <section className="flex flex-col p-0 pixel-border md:col-span-6 bg-surface">
                  <div className="relative overflow-hidden border-b-2 border-on-surface" style={{ height: '140px' }}>
                    <img className="h-full w-full max-w-full object-cover" alt="High speed"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN7R_L06MG9eVMvxFVFFbA0LB710dhPK86SQzVU0xQljRpAtyFjOk5C0zhAbp4Jif49R1-BFnKw2BvuTNO5vvjLni7WnAL_NCGiWY9HpUGx0FOhnIwFDdo7BL6XJJ5uM6_iEZFVaGllAkxx_c31869JPVEt8Mz2IDyVhJIb5Dd_vgB56kyKYo1D80vNK8UQnVmWde5jS4Ax6oeMBI3CSy1sIgrPwlclq-Kge73wiMI544e3-YkO_9SXA" />
                    <div className="absolute left-3 top-3 bg-on-surface px-3 py-0.5 font-label-caps text-surface">HIGH SPEED [1/2000s]</div>
                  </div>
                  <div className="flex-grow bg-surface-bright p-2">
                    <h3 className="mb-0.5 font-headline-md text-primary">高速快门 (1/500s 以上)</h3>
                    <p className="font-body-lg text-on-surface-variant">可凝固快速运动的物体，如奔跑的动物、运动中的人。能捕捉肉眼无法察觉的瞬间细节。</p>
                  </div>
                </section>

                {/* Slow Speed */}
                <section className="flex flex-col p-0 pixel-border md:col-span-6 bg-surface">
                  <div className="relative overflow-hidden border-b-2 border-on-surface" style={{ height: '140px' }}>
                    <img className="h-full w-full max-w-full object-cover" alt="Slow shutter"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy0gvurHJMIyclIktlShqnPTn64JuBdjkv7qDoouzjFZ9raLEyRDPuijoPkBkfjAjFcIWobj9ewyY0vyKuU2wLUs9idSH8X3-7A5idwAQpviLVEExHQaY206VjfT1nWM9BYEDk0b0O96zSYP3iF009k6grW-uTZwdmRL0QI-QcjWTKl-FirpwTwiLVXO1ohC-hHZSuWU4E9VZZuwd49GRLl_ubDUNm7HVqiF0CwlCX11S3eMJYwlLH6Q" />
                  </div>
                  <div className="flex-grow bg-surface-bright p-2">
                    <h3 className="mb-0.5 font-headline-md text-tertiary">慢速快门 (1/30s 以下)</h3>
                    <p className="font-body-lg text-on-surface-variant">会产生运动模糊，适合拍摄流水、光轨、星轨，通常需要三脚架以维持非移动景物的清晰度。</p>
                  </div>
                </section>

                {/* Safety Rule */}
                <section className="flex flex-col items-center gap-2 border-dashed p-2 pixel-border md:col-span-12 bg-secondary-container md:flex-row">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center border-4 border-primary bg-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="material-symbols-outlined text-[36px] text-primary-fixed">pan_tool</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-0.5 font-headline-md text-on-secondary-container">安全快门规则</h2>
                    <p className="font-body-lg leading-relaxed text-on-secondary-container">
                      手持拍摄时，快门速度不应低于焦距的倒数。例如使用 <span className="font-bold underline decoration-2">50mm</span> 镜头时，快门速度应不慢于 <span className="inline-block border border-on-surface bg-white/50 px-1 font-bold">1/50s</span>，否则容易因手抖导致画面模糊。
                    </p>
                  </div>
                </section>

                {/* Dials */}
                <section className="mt-2 grid grid-cols-2 gap-1 md:col-span-12 md:grid-cols-4">
                  <div className="pixel-border bg-surface-container-high p-2 text-center">
                    <div className="mb-0.5 font-label-caps text-on-surface-variant">CURRENT_VAL</div>
                    <div className="font-headline-md text-primary">1/125</div>
                  </div>
                  <div className="pixel-border bg-surface-container-high p-2 text-center">
                    <div className="mb-0.5 font-label-caps text-on-surface-variant">APERTURE</div>
                    <div className="font-headline-md text-on-surface">f/8.0</div>
                  </div>
                  <div className="pixel-border bg-surface-container-high p-2 text-center">
                    <div className="mb-0.5 font-label-caps text-on-surface-variant">ISO_GAIN</div>
                    <div className="font-headline-md text-on-surface">400</div>
                  </div>
                  <div className="group cursor-pointer p-2 text-center pixel-border bg-primary-container transition-colors hover:bg-primary">
                    <div className="mb-0.5 font-label-caps text-on-primary-container group-hover:text-white">ACTION</div>
                    <div className="font-headline-md text-on-primary-container group-hover:text-white">SIMULATE</div>
                  </div>
                </section>
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
