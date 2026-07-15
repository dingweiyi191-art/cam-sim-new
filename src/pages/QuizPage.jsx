import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    title: '1. 光圈 f 值越小，表示什么？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY_DeQlK2xOnYXUV2eCmNHpcN3GbsNxS6m0CyNxSYecltuJItOgiZ1orkSQ419pxKbH02VbEKV13UIBrP6g1JqIfrOlWV6AAT1zNpRqOd66rwvMpK7CeMpGomOLdYl3ixlqt3QJbXkhaAbQAlFN1_2ri8CF7NI4O9-7sqcQhAHQnD5ZHmljTisW_rNkRnC35PVHtOZr-uXsEpfy3K27Prh5rvmdnAgu02cBFHsoGnp89-FK_MQvOZD4g',
    options: [
      { key: 'A', text: '光圈开口越小，进光量越少' },
      { key: 'B', text: '光圈开口越大，进光量越多', correct: true },
      { key: 'C', text: '光圈与进光量无关' },
      { key: 'D', text: '光圈开口越大，画面越暗' },
    ],
  },
  {
    id: 2,
    title: '2. 快门速度 1/1000s 最适合拍摄什么场景？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN7R_L06MG9eVMvxFVFFbA0LB710dhPK86SQzVU0xQljRpAtyFjOk5C0zhAbp4Jif49R1-BFnKw2BvuTNO5vvjLni7WnAL_NCGiWY9HpUGx0FOhnIwFDdo7BL6XJJ5uM6_iEZFVaGllAkxx_c31869JPVEt8Mz2IDyVhJIb5Dd_vgB56kyKYo1D80vNK8UQnVmWde5jS4Ax6oeMBI3CSy1sIgrPwlclq-Kge73wiMI544e3-YkO_9SXA',
    options: [
      { key: 'A', text: '丝绸般流水的瀑布' },
      { key: 'B', text: '高速运动中的人物或动物', correct: true },
      { key: 'C', text: '夜晚星空轨迹' },
      { key: 'D', text: '城市车流光轨' },
    ],
  },
  {
    id: 3,
    title: '3. ISO 感光度越高，画面会出现什么变化？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDarYP1BHhz978fqbTEzAX4bvu9Qez8VAkOjwXnmcrKvAuq7VQoqWCyTA2_g45eT0DdsXE9zU1E8ypelR8O51FDUnYUy3QMAM4t4ORacBsHXZJYyVtI1qEkgvtghGQ63IfmA0tbzeMoH9FrZxniul8pnw7zH5uYMBonaZlnDy5batZSrs-U7_jwlW1kzQMnrD3KmknemeqaZo0jHh9QJNXz-AGDV1gcetoRiynnJDLT0BhG62f5I_6YGQ',
    options: [
      { key: 'A', text: '画面更纯净，色彩更鲜艳' },
      { key: 'B', text: '画面噪点增多，颗粒感增强', correct: true },
      { key: 'C', text: '画面颜色变淡，趋于黑白' },
      { key: 'D', text: '画面锐度提升，细节更清晰' },
    ],
  },
  {
    id: 4,
    title: '4. 使用 50mm 镜头手持拍摄，安全快门速度应不低于？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtJ3EO5uZLyZYgBhSE1VR69yPOfPhlibdxxJbTiJTDTlxCGbR2taEAgwwiOnen7b--GB1a_xanSsrsF3Dn2pTNLNmxFWzK4A4ct2PRClY9tFTVKltFziFiFK2ihEm9DtQ-yTwsD3aa0E8BiyE9pw1tFL-1Oe4UQO3RYCpXdv2ROustACUJAHhuPmjHA6MKuSQAQvvjGAV8ElDFTEIZuxxIFvNjBjmLHasNLdQiuq4ZQY0ymgb1dJ4SUw',
    options: [
      { key: 'A', text: '1/15s' },
      { key: 'B', text: '1/250s' },
      { key: 'C', text: '1/50s', correct: true },
      { key: 'D', text: '1/500s' },
    ],
  },
  {
    id: 5,
    title: '5. 对焦模式中，单次对焦（AF-S / One-Shot）最适合拍摄什么？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDusnyFAh4TtqryRxuPp-GmjfBa7eXIZYzE0ApCP2jE3OKQvo58i5VWRNGMtcHCxbaq4Wp4ZConzhuDLoWzZdLllxjUoVIV1gzHvFsJeXH9lVhvDoPHmhhZX8ZJs16yk_Vco3X0BGRqyb1ttq12gJXmucAlVqVIhzifo13GFmq8U4dKPc5pjUzouiE5D-51K_JNLN9DsDYV5QTg7CdVJDbVN8-9ZahDOPxQwV0Xofz9le4pg2ZYQMZmXw',
    options: [
      { key: 'A', text: '高速运动的赛车' },
      { key: 'B', text: '静止的静物或风景', correct: true },
      { key: 'C', text: '飞翔中的鸟群' },
      { key: 'D', text: '奔跑中的儿童' },
    ],
  },
  {
    id: 6,
    title: '6. 以下哪一项不属于曝光三要素？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwLpHDkA83CSKw41XznZ4qe087WI0yuH9VoJgWFrhluJDhTOhHizo4wTdqJelT5DkvpiXV6YUItxdf_FA6f84bRHJc8fdKQTr6P3cy-1eb5KYD-Dmq45TpbtrXpduFfiVYgpLWK3pNrBxjjhoCvZmufnU0XEMl3HKTELiiRU28T2YICn9X5qjLzPN3rRuuObhD-MBAFQf4__hPCgoQGabQnboJSCVOMHSG6cLJEWHR28EueGEfl1BIbQ',
    options: [
      { key: 'A', text: '光圈' },
      { key: 'B', text: '快门速度' },
      { key: 'C', text: '白平衡', correct: true },
      { key: 'D', text: '感光度 (ISO)' },
    ],
  },
  {
    id: 7,
    title: '7. 长焦镜头（200mm以上）的特点是什么？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw6BzCUR-OmfXtTn8w58O9ZMNl_74ZKIqSClmeXvYqTO4YIRrdW91DIAq54Kd252It1JyxkEkjtAAgnLK2pZBYm8JtikPOMA3fm1xE-BVsbQFGp_11gFbz0bXZwUPBTyAzAR_jAoNuv2lAWmWr3Zs0eaTDlnsoMlhDnWF-JHUHIBi0zNKVKfs6eEdNjqP80edxpk_2QQt_P2sdlM7_5OzfZKjP9K_nVsX6kcVTfGTo48heucY-AlgFCw',
    options: [
      { key: 'A', text: '视角宽广，适合拍大场景' },
      { key: 'B', text: '拉近远处物体，产生压缩感', correct: true },
      { key: 'C', text: '画面变形夸张，边缘拉伸' },
      { key: 'D', text: '景深很大，远近皆清晰' },
    ],
  },
  {
    id: 8,
    title: '8. 逆光拍摄人像时，常用的补光方法是？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5tyG9mela-cP6PA-1qyATWwxOhjXJLzUvAzXvk_1EKDu-PGYRu5LSmwc0uHy5_KZkJJsWjym4YLU4XxcgHScmwv01r8mkPkWJyvhLAzhe0ftuMDMdJ1p8VBFlAjBId0XB8-lIwBtmf97A_spexcRKSmpX2hqplLTgRVHAfAzKiF1e2y53KYK4cGTfFwz2W1I2rGojguMHgLBDqxgovJNQv_VzN8uBqmU_OQOs8zfaSwLCh24WAun9Lg',
    options: [
      { key: 'A', text: '降低 ISO 到最小值' },
      { key: 'B', text: '使用反光板或闪光灯补光', correct: true },
      { key: 'C', text: '缩小光圈至 f/22' },
      { key: 'D', text: '增大快门速度到 1/4000s' },
    ],
  },
  {
    id: 9,
    title: '9. 微距摄影（如花卉特写）通常推荐使用什么光圈？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-KxY8oKuQDR8CuiGQMZQTS9SOSOa-ugO148FnCVLWGK8YjA1K0O7qellqalEvL8TtLduGpfsXcReIoqt8WzgK9uyWgNq__KxdcY_KynZt4Q2P2uEirC1sBBROEoBFYNvSI9fKu_C7s6idBmR3T3vxurKwSCGjQFcn3tKA6r935tskrvobQw6C6KeM97xpoqRcESTT3hcDrdc6gPJLUMPUJhCToi783ATDoVUFdBjx-J4rOtsyPM71oA',
    options: [
      { key: 'A', text: 'f/16-f/22 追求最大景深' },
      { key: 'B', text: 'f/5.6-f/11 平衡景深与画质', correct: true },
      { key: 'C', text: 'f/1.4 追求极致虚化' },
      { key: 'D', text: '微距不需要设置光圈' },
    ],
  },
  {
    id: 10,
    title: '10. 长时间曝光（如 30s）最适合拍摄什么？',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy0gvurHJMIyclIktlShqnPTn64JuBdjkv7qDoouzjFZ9raLEyRDPuijoPkBkfjAjFcIWobj9ewyY0vyKuU2wLUs9idSH8X3-7A5idwAQpviLVEExHQaY206VjfT1nWM9BYEDk0b0O96zSYP3iF009k6grW-uTZwdmRL0QI-QcjWTKl-FirpwTwiLVXO1ohC-hHZSuWU4E9VZZuwd49GRLl_ubDUNm7HVqiF0CwlCX11S3eMJYwlLH6Q',
    options: [
      { key: 'A', text: '体育赛事中的运动瞬间' },
      { key: 'B', text: '天空中的飞鸟' },
      { key: 'C', text: '夜景车流光轨和星空', correct: true },
      { key: 'D', text: '街头抓拍行人' },
    ],
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({}); // { [qId]: bool } — 每题答题后立即记录对错
  const q = QUESTIONS[currentQ];
  const completed = Object.keys(feedback).length;
  const progress = (completed / QUESTIONS.length) * 100;
  const currentScore = Object.values(feedback).filter(v => v === true).length;

  const selectAnswer = (questionId, optionKey) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    // 立即判断对错并记录反馈
    const question = QUESTIONS.find(q => q.id === questionId);
    const correctOpt = question.options.find(o => o.correct);
    setFeedback((prev) => ({ ...prev, [questionId]: optionKey === correctOpt.key }));
  };

  useEffect(() => {
    // visual feedback on radio selection
    const radios = document.querySelectorAll('input[type="radio"]');
    const handler = (e) => {
      const container = e.target.closest('label');
      if (container) {
        container.classList.add('scale-105');
        setTimeout(() => container.classList.remove('scale-105'), 100);
      }
    };
    radios.forEach((r) => r.addEventListener('change', handler));
    return () => radios.forEach((r) => r.removeEventListener('change', handler));
  }, [currentQ]);

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; background: #fbfbe3; }
        .page-wrapper {
          width: 1440px; max-width: 97vw; margin: 2px auto; padding: 2px;
          display: flex; flex-direction: column;
          transform: scale(0.94); transform-origin: top center;
          min-height: 105vh; box-sizing: border-box;
        }
        .pixel-border { border: 4px solid #1b1d0e; }
        .pixel-border-sm { border: 2px solid #1b1d0e; }
        .dither-overlay {
          background-image: radial-gradient(circle, #1b1d0e 1px, transparent 1px);
          background-size: 4px 4px;
        }
        .scale-105 { transform: scale(1.05); }
        input[type="radio"]:checked + div { background-color: #227722 !important; box-shadow: none !important; }
        input[type="radio"]:checked + div + div { background-color: #c7f2b6 !important; border-color: #227722 !important; }
        input[type="radio"]:checked + div span { color: #ffffff !important; }
        main p, main h4 { white-space: normal; word-wrap: break-word; overflow-x: visible; }
      `}</style>

      <div className="page-wrapper overflow-hidden bg-surface">
        {/* Header */}
        <header className="sticky top-0 z-50 mx-auto w-full border-b-4 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between" style={{ padding: '1px 80px' }}>
            <nav className="flex items-center justify-between py-0">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined font-headline-md text-tertiary">videogame_asset</span>
                <h1 className="font-headline-md tracking-tighter text-tertiary">CAM-SIM 8-BIT</h1>
              </div>
              <div className="hidden gap-margin-md md:flex" style={{ marginLeft: '64px' }}>
                <a className="font-label-caps text-on-surface transition-colors hover:text-tertiary active:translate-y-0.5" href="#">SIMULATOR</a>
                <a className="font-label-caps border-b-4 border-primary text-primary transition-colors hover:text-tertiary active:translate-y-0.5" href="#">GALLERY</a>
                <a className="font-label-caps text-on-surface transition-colors hover:text-tertiary active:translate-y-0.5" href="#">GUIDES</a>
              </div>
            </nav>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/knowledge-hub')}
                className="border-2 border-on-surface bg-surface px-2 py-0 font-label-caps text-on-surface transition-all hover:bg-primary-container hover:text-on-primary-container active:translate-x-0.5 active:translate-y-0.5"
              >
                ← 退出
              </button>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex w-full flex-1 gap-0" style={{ padding: '0 80px' }}>
          {/* Sidebar */}
          <aside className="flex w-[240px] flex-shrink-0 flex-col gap-2 overflow-hidden border-r-4 border-on-surface bg-surface-container p-2">
            <div className="flex flex-col gap-1 border-b-2 border-on-surface pb-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden border-2 border-on-surface bg-primary-container">
                <img className="h-full w-full object-cover" alt="操作员头像"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJnxOhDyWp1EMAee0R-GupRlgloTNsE23oerDsOh3d3K-gdTYBR0_3CdLCzdfFo003uJpRbDpFAznpoWX8Pi_HHvDQhJhVWF6KrZ6InCkIhsEyb_L1aMWVOv1E1DR-vhED1YegwZ6s0Jtuwb277Sc-qxiOZNe33Jn5Caca3wFJjw7RnptdFOL66vD3XYIHcT_qwh_Oxth1HwYo4U4pU6Jxko5dgHvV5Y5CZrTU227kviFWFqud7PiaPQ" />
              </div>
              <div>
                <p className="text-[14px] font-headline-md text-primary">OPERATOR_01</p>
                <p className="text-[10px] font-label-caps text-on-surface-variant">LEVEL 5 PHOTOG</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {['camera|APERTURE', 'shutter_speed|SHUTTER', 'iso|ISO', 'center_focus_strong|FOCUS'].map((item, i) => {
                const [icon, label] = item.split('|');
                return (
                  <button key={i} className="group flex items-center gap-2 border-2 border-on-surface bg-surface p-2 transition-all hover:bg-secondary-container active:scale-95">
                    <span className="material-symbols-outlined text-on-surface">{icon}</span>
                    <span className="font-label-caps text-on-surface">{label}</span>
                  </button>
                );
              })}
              <button className="group mt-2 flex items-center gap-2 border-2 border-on-surface bg-primary-container p-2 text-on-primary-container shadow-none transition-all active:scale-95 translate-x-1 translate-y-1">
                <span className="material-symbols-outlined">quiz</span>
                <span className="font-label-caps">QUIZ_MODE</span>
              </button>
            </nav>
            <div className="mt-auto flex flex-col gap-1 border-t-2 border-on-surface pt-2">
              <button className="flex items-center gap-2 text-[10px] font-label-caps text-on-surface-variant hover:text-tertiary">
                <span className="material-symbols-outlined text-[16px]">help</span> HELP
              </button>
              <button className="flex items-center gap-2 text-[10px] font-label-caps text-on-surface-variant hover:text-error">
                <span className="material-symbols-outlined text-[16px]">logout</span> LOGOUT
              </button>
            </div>
          </aside>

          {/* Main Quiz Content */}
          <main className="flex-grow py-1 pl-0 pr-0">
            <div className="mx-auto" style={{ width: '100%', maxWidth: '82vw', transform: 'scale(0.97)', transformOrigin: 'top left' }}>
              {/* Quiz Header */}
              <div className="pixel-border mb-2 flex items-center justify-between bg-surface-container-highest p-1.5">
                <div className="flex items-center gap-3">
                  <div className="bg-on-surface p-1.5">
                    <span className="material-symbols-outlined text-surface" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-on-surface">知识检测 // KNOWLEDGE QUIZ</h2>
                    <p className="font-body-sm text-on-surface-variant">SYSTEM READY // VERSION 1.0.8</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="pixel-border-sm bg-primary-container px-2 py-0.5 font-label-caps text-on-primary-container">MODE: TRAINING</div>
                </div>
              </div>

              {/* Progress */}
              <div className="pixel-border relative mb-2 overflow-hidden bg-surface p-3">
                <div className="pointer-events-none absolute inset-0 dither-overlay"></div>
                <div className="relative z-10 flex items-end justify-between">
                  <span className="font-headline-md text-on-surface">第 {currentQ + 1} / {QUESTIONS.length} 题</span>
                  <span className="mb-0.5 font-label-caps text-on-surface-variant">已答: {completed}/{QUESTIONS.length}</span>
                </div>
                <div className="flex h-5 w-full gap-1 border-4 border-on-surface bg-surface-variant p-0.5">
                  <div className="h-full bg-primary-container transition-all" style={{ width: `${progress}%` }}></div>
                  <div className="flex-1 bg-transparent"></div>
                </div>
              </div>

              {/* Question Card */}
              <section className="pixel-border relative mb-2 bg-surface p-3">
                <div className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-tertiary"></div>
                <div className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-tertiary"></div>
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-tertiary"></div>
                <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-tertiary"></div>

                {/* Running Score */}
                {completed > 0 && (
                  <div className="mb-1.5 border-2 border-on-surface bg-primary-container p-2 text-center">
                    <p className="font-headline-md text-on-primary-container">
                      实时得分: {currentScore} / {QUESTIONS.length}
                      {completed < QUESTIONS.length && (
                        <span className="text-tertiary">（{QUESTIONS.length - completed} 题未作答）</span>
                      )}
                    </p>
                  </div>
                )}

                <h3 className="mb-4 font-headline-md text-on-surface">{q.title}</h3>

                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.key;

                    // 选中：绿色边框 #227722 + 浅绿背景 #c7f2b6
                    // 未选中：默认灰色边框 + 浅灰底色，不出现红色
                    // 对错判断完全交给底部提示条

                    return (
                      <label key={opt.key} className="group flex cursor-pointer items-center gap-2">
                        <input
                          className="peer hidden"
                          name={`quiz_${q.id}`}
                          type="radio"
                          checked={isSelected}
                          onChange={() => selectAnswer(q.id, opt.key)}
                        />
                        <div
                          className="pixel-border-sm flex h-6 w-6 items-center justify-center transition-all"
                          style={{
                            backgroundColor: isSelected ? '#227722' : '#d6d6d6',
                            borderColor: isSelected ? '#227722' : '#1b1d0e',
                          }}
                        >
                          <span className="font-label-caps" style={{ color: isSelected ? '#ffffff' : '#1b1d0e' }}>{opt.key}</span>
                        </div>
                        <div
                          className="pixel-border-sm flex-1 p-1.5 transition-all group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none"
                          style={{
                            overflow: 'visible',
                            backgroundColor: isSelected ? '#c7f2b6' : '#e8e8e8',
                            borderColor: isSelected ? '#227722' : '#1b1d0e',
                          }}
                        >
                          <p className="font-body-lg text-on-surface">{opt.text}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Feedback Bar — 答题后立即显示在选项下方 */}
                {feedback[q.id] !== undefined && (
                  feedback[q.id] ? (
                    <div className="mt-3 flex items-center gap-2 border-2 px-3 py-2 font-headline-md" style={{ borderColor: '#227722', backgroundColor: '#c7f2b6', color: '#1b1d0e' }}>
                      <span className="material-symbols-outlined text-[24px]">check_circle</span>
                      <span>回答正确！</span>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-2 border-2 px-3 py-2 font-headline-md" style={{ borderColor: '#cc2222', backgroundColor: '#fce4e4', color: '#1b1d0e' }}>
                      <span className="material-symbols-outlined text-[24px]">cancel</span>
                      <span>回答错误！正确选项为：{(() => { const co = q.options.find(o => o.correct); return `${co.key}.（${co.text}）`; })()}</span>
                    </div>
                  )
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t-4 border-dotted border-on-surface pt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
                      disabled={currentQ === 0}
                      className="flex items-center gap-2 border-4 border-on-surface bg-surface px-3 py-1 font-label-caps shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-surface-variant active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-30"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                      <span>上一题</span>
                    </button>
                    <button
                      onClick={() => setCurrentQ((p) => Math.min(QUESTIONS.length - 1, p + 1))}
                      disabled={!answers[q.id] || currentQ === QUESTIONS.length - 1}
                      className="flex items-center gap-2 border-4 border-on-surface bg-primary-container px-3 py-1 font-label-caps text-on-primary-container shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-primary active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-30"
                    >
                      下一题
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                    <span className="font-label-caps text-on-surface-variant ml-1">{currentQ + 1}/{QUESTIONS.length}</span>
                  </div>
                </div>
              </section>

              {/* Bento Context */}
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="pixel-border bg-tertiary-fixed-dim p-3">
                  <h4 className="mb-2 flex items-center gap-2 text-[13px] font-headline-md text-on-tertiary-fixed">
                    <span className="material-symbols-outlined">lightbulb</span> TECHNICAL TIP
                  </h4>
                  <p className="font-body-sm text-on-tertiary-fixed-variant">
                    Remember: F-stop is a fraction. f/2 is larger than f/16. Think of it like a cake—1/2 a cake is much bigger than 1/16 of a cake!
                  </p>
                </div>
                <div className="pixel-border group relative overflow-hidden bg-secondary-fixed p-3">
                  <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi5zm0AJ-dGiKj0K8KNJzu_H-nSjT2qBVy51-aCK9N70DzhQTgyp_QCEpEbYLmnVNweyCZcafpeoCWl_AjOJiS73i0oZkzCCLuI5SIbr5arZnL9iOMi8kia9REHHpJ22rBC0rtCvigKSSRcFNDN1rwo4km60W_PYN9qTvh-0nGqgweWrg5dKP8ILWHbDbdEWE7rGtGyW1I_dNS8vwd6RY8Zzw-NcoYjlxTgjQTvAIywWaGsYO-7Kz8sQ')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <h4 className="relative z-10 mb-2 flex items-center gap-2 text-[13px] font-headline-md text-on-secondary-fixed">
                    <span className="material-symbols-outlined">visibility</span> VISUAL GUIDE
                  </h4>
                  <p className="relative z-10 font-body-sm text-on-secondary-fixed-variant">
                    Study the iris chart to visualize how light travels through the lens opening.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="mx-auto mt-auto w-full border-t-2 border-primary bg-on-surface text-surface">
          <div className="flex flex-col items-center px-[80px] py-0.5 md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:items-start">
              <p className="mb-0.5 font-label-caps text-primary-fixed">PIXEL-OPTICS SYSTEMS</p>
              <p className="font-body-sm text-surface-variant opacity-70">©1989 ALL RIGHTS RESERVED.</p>
            </div>
            <div className="mt-4 flex gap-gutter md:mt-0">
              <a className="font-body-sm text-surface-variant underline decoration-2 transition-all hover:text-secondary-fixed" href="#">PRIVACY.EXE</a>
              <a className="font-body-sm text-surface-variant underline decoration-2 transition-all hover:text-secondary-fixed" href="#">TERMS.BAT</a>
              <a className="font-body-sm text-surface-variant underline decoration-2 transition-all hover:text-secondary-fixed" href="#">CONTACT.SYS</a>
            </div>
            <div className="hidden lg:block">
              <div className="flex gap-1">
                <div className="h-2 w-2 bg-primary"></div>
                <div className="h-2 w-2 bg-secondary"></div>
                <div className="h-2 w-2 bg-tertiary"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
