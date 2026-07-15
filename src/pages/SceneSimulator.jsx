import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 模拟场景选择 — 二级页面（左侧260px侧边栏）
 */
export default function SceneSimulator() {
  const navigate = useNavigate();

  useEffect(() => {
    const mousedown = (e) => {
      const el = e.target.closest('button, .group');
      if (!el) return;
      if (el.classList.contains('shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]')) {
        el.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,1)';
        el.style.transform = 'translate(8px, 8px)';
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
      <style>{`
        html, body { margin: 0; padding: 0; background: #fbfbe3; }
        .page-wrapper {
          width: 1440px; max-width: 94vw; margin: 8px auto; padding: 8px;
          display: flex; flex-direction: column;
          transform: scale(0.88); transform-origin: top center;
          min-height: 100vh; box-sizing: border-box;
        }
        .pixel-grid {
          background-image: linear-gradient(rgba(27,29,14,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(27,29,14,0.05) 1px, transparent 1px);
          background-size: 8px 8px;
        }
      `}</style>

      <div className="page-wrapper overflow-x-hidden bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b-4 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-[80px]">
          <nav className="flex w-full items-center justify-between py-0.5">
            <div className="flex items-center gap-4">
              <a className="font-headline-md text-headline-md text-tertiary hover:text-tertiary-fixed transition-colors active:translate-x-0.5 active:translate-y-0.5" href="#">
                CAM-SIM 8-BIT
              </a>
            </div>
            <div className="hidden gap-8 md:flex">
              <a className="font-headline-md text-headline-md text-primary border-b-4 border-primary transition-colors" href="#">模拟场景</a>
            </div>
            <div className="flex items-center gap-4"></div>
          </nav>
        </header>

        {/* Body */}
        <div className="flex w-full flex-1 flex-row overflow-hidden px-[80px]">
          {/* Sidebar 260px — KnowledgeHub style */}
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
          <main className="flex-grow overflow-hidden p-2 md:p-4">
            <header className="mb-1">
              <div className="mb-1 flex items-center gap-4">
                <button onClick={() => navigate('/')} className="material-symbols-outlined border-2 border-on-surface bg-surface-container-high p-1 text-primary transition-all hover:bg-primary-container hover:text-on-primary-container active:translate-y-1">arrow_back</button>
                <span className="font-label-caps uppercase text-on-surface-variant">主菜单 / 模拟场景</span>
              </div>
              <h1 className="font-headline-lg text-on-surface md:text-headline-lg">选择您的模拟任务</h1>
              <div className="mt-1 h-1 w-32 bg-tertiary"></div>
            </header>

            {/* Cards Grid */}
            <section className="grid grid-cols-4 gap-1">
              {[
                { title: '城市夜景', lv: 'Lv.3', diff: '困难', diffColor: 'text-tertiary', desc: '练习长曝光拍摄与高感光度噪点控制。', bg: 'bg-inverse-surface', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKYlMDMDNvxqz7wsHCTU5FyVrnICxUKf5Qzsxn6XpN9SxmzwhVQGqzkqesPy9ROqcV_LqqEHZgmZxD0nBSuGvObaA2OHutTPJLvKgyUlQFN199tPXfX59tEbrL5gjb2ep8J8LdJfxwReCObTcGwB3KuObfJJ9jb3Afi4hYDWWIvOl7jwj2iGigdyO9iUVingRWnKIP0ajdGZkev2v6U1Z6CdQVwWBE9W-OJwdE2Q8O-rfp77nellNVTQ' },
                { title: '雪山旷野', lv: 'Lv.2', diff: '普通', diffColor: 'text-secondary', desc: '学习在极高亮度环境下的曝光补偿。', bg: 'bg-surface-container-lowest', img: 'https://lh3.googleusercontent.com/aida/AP1WRLvKLO10VwzUudALS2aP2JVKeOUjsqlF7zeruue0PfnK8B1Lwq7wdDDRnXkWmh2VLPey6cPp1_MpzpQ57iIXbBNQ0jZswodOANwDdVwi6M_Olh8EGVIJyi5SYwV9EV-wiphNziE1gKGlsG-6PAa7WIjwDNbLwl7RfzYnLUD6UOFOaLEDj27sTFfAMqKzWqgAIlymXRztA0X40IxB_urrbP5xQRnPtz9093S52S909UB9j3De2W3-oG-uYOd7' },
                { title: '室内暗景', lv: 'Lv.4', diff: '困难', diffColor: 'text-tertiary', desc: '掌握弱光环境下的手持拍摄技巧。', bg: 'bg-surface-dim', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpZOZSASA0zZNew725grY-789sr8Hzvm7pr-tpEytqNOu3M0Hm9NdIKii9sTpWmRBVpDSgeNgATzJ_M_bzX-6fXsqZ3TrxEq8DFwwj-j-z_Jo5yl4nsrb3A1PS1zpOwhA8j-XeDOV3Va-q_MMhlIDMRlwidh90cUykPxcJYHq2CAal2RLxEwyzJbY4fTc2CfF0DgLz_c7lqe4zaXHj40M88qMoxvD2XEEooTZWCGc524TbiUw_gzhdWQ' },
                { title: '室内静物', lv: 'Lv.1', diff: '简单', diffColor: 'text-secondary', desc: '通过光圈控制景深，突出物品细节。', bg: 'bg-surface-container-high', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDusnyFAh4TtqryRxuPp-GmjfBa7eXIZYzE0ApCP2jE3OKQvo58i5VWRNGMtcHCxbaq4Wp4ZConzhuDLoWzZdLllxjUoVIV1gzHvFsJeXH9lVhvDoPHmhhZX8ZJs16yk_Vco3X0BGRqyb1ttq12gJXmucAlVqVIhzifo13GFmq8U4dKPc5pjUzouiE5D-51K_JNLN9DsDYV5QTg7CdVJDbVN8-9ZahDOPxQwV0Xofz9le4pg2ZYQMZmXw' },
                { title: '微距花卉', lv: 'Lv.2', diff: '普通', diffColor: 'text-secondary', desc: '使用微距模式捕捉自然界的精美纹理。', bg: 'bg-tertiary-container', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw6BzCUR-OmfXtTn8w58O9ZMNl_74ZKIqSClmeXvYqTO4YIRrdW91DIAq54Kd252It1JyxkEkjtAAgnLK2pZBYm8JtikPOMA3fm1xE-BVsbQFGp_11gFbz0bXZwUPBTyAzAR_jAoNuv2lAWmWr3Zs0eaTDlnsoMlhDnWF-JHUHIBi0zNKVKfs6eEdNjqP80edxpk_2QQt_P2sdlM7_5OzfZKjP9K_nVsX6kcVTfGTo48heucY-AlgFCw' },
                { title: '日间城市', lv: 'Lv.1', diff: '简单', diffColor: 'text-secondary', desc: '在强烈的日光下练习街头快拍。', bg: 'bg-surface-variant', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvvfJtxk4OaEplDRXQBjZivuBul63ED_0ndTL5FqtxrNnBWQGsYgsgjyTV2C7sqkZkUzcHWyi2SXqJz45yzQWI1FW45vXxBwL49EIQ2po4jocU_wNE8--0yTNPSGYJKVYnOB3jn-a0IwoeO8oaSTpoQ3HyfLUjh2F0x_mKvtTUR9plkpwc21CBY-RnimHm1SlRkAPfwIQh4Hwb6MbZpyGfrThDUtZmEfPF_h5Z8oO7icEJABGMhFnepw' },
                { title: '山间云雾', lv: 'Lv.3', diff: '困难', diffColor: 'text-tertiary', desc: '拍摄流动的云海，掌握慢速快门技巧。', bg: 'bg-primary-fixed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmeqkxSDAH6rTVbdkTpsnkfCh2CGwMx6p81JGIv7VmujL711hSznZFW6Ii-DHr3YJRiRdcI_eohuW2swdQ0ROyFNHhhtDmVuL7Z5nm6mbfe_7GgdvLl6dtdmk4NYgbt7XO9DsVnfQkVhaFcCJx-Z9POZX8tc5ABu3luT4ugLbvL0pYcbSiMx6Mmv5F5A6A1U2qdnLLU_5PUAzGlPSjGzKSkEbwB5Bhjt9SXk4HWPPO0-mqbtaL9NVTcw' },
                { title: '黄昏日落', lv: 'Lv.5', diff: '专家级', diffColor: 'text-error', desc: '捕捉迷人的黄金时刻，练习平衡高反差光线。', bg: 'bg-on-tertiary-container', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5tyG9mela-cP6PA-1qyATWwxOhjXJLzUvAzXvk_1EKDu-PGYRu5LSmwc0uHy5_KZkJJsWjym4YLU4XxcgHScmwv01r8mkPkWJyvhLAzhe0ftuMDMdJ1p8VBFlAjBId0XB8-lIwBtmf97A_spexcRKSmpX2hqplLTgRVHAfAzKiF1e2y53KYK4cGTfFwz2W1I2rGojguMHgLBDqxgovJNQv_VzN8uBqmU_OQOs8zfaSwLCh24WAun9Lg' },
              ].map((card, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/shooting-detail?img=${encodeURIComponent(card.img)}`)}
                  className="group flex max-w-sm cursor-pointer flex-col overflow-hidden border-4 border-on-surface bg-surface shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className={`relative h-[118px] overflow-hidden border-b-4 border-on-surface ${card.bg}`}>
                    <img className="h-full w-full max-w-full object-cover" alt={card.title} src={card.img} />
                    <div className="absolute right-2 top-2 bg-on-surface px-2 py-0.5 font-label-caps text-surface">{card.lv}</div>
                  </div>
                  <div className="flex flex-1 flex-col bg-surface-container p-2">
                    <h3 className="mb-0.5 font-headline-md text-primary">{card.title}</h3>
                    <p className="mb-1 font-body-sm text-on-surface-variant">{card.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className={`font-label-caps ${card.diffColor}`}>{card.diff}</span>
                      <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-2">play_arrow</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Bottom Status Bar */}
            <div className="mt-2 flex flex-col items-center justify-between border-t-4 border-on-surface pt-1 text-on-surface-variant md:flex-row">
              <div className="mb-2 flex gap-4 md:mb-0">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 border border-on-surface bg-primary"></span>
                  <span className="font-label-caps">任务已同步: 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 animate-pulse border border-on-surface bg-tertiary"></span>
                  <span className="font-label-caps">新挑战已开启</span>
                </div>
              </div>
              <div className="flex gap-gutter">
                <button className="border-2 border-on-surface bg-surface-container-highest px-4 py-1 font-label-caps transition-all hover:bg-on-surface hover:text-surface">查看排行榜</button>
                <button className="border-2 border-on-surface bg-surface-container-highest px-4 py-1 font-label-caps transition-all hover:bg-on-surface hover:text-surface">器材包</button>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-auto w-full border-t-2 border-primary bg-on-surface px-[80px] text-surface">
          <div className="mx-auto flex w-full flex-col items-center justify-between py-2 md:flex-row">
            <p className="mb-1 font-body-sm uppercase text-surface-variant md:mb-0">©1989 PIXEL-OPTICS SYSTEMS. 版权所有。</p>
            <div className="flex gap-8">
              <a className="font-label-caps text-primary-fixed underline transition-all hover:text-secondary-fixed" href="#">隐私权.EXE</a>
              <a className="font-label-caps text-primary-fixed underline transition-all hover:text-secondary-fixed" href="#">条款.BAT</a>
              <a className="font-label-caps text-primary-fixed underline transition-all hover:text-secondary-fixed" href="#">联系.SYS</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
