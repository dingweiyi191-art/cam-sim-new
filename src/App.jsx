/**
 * CAM-SIM 8-BIT — App 入口 + 路由
 * 知识学习链路：首页 → 知识枢纽 → 光圈/快门/ISO/检测
 * 场景模拟链路：首页 → 场景选择 → 拍摄详情（带图片传参）
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KnowledgeHub from './pages/KnowledgeHub';
import SceneSimulator from './pages/SceneSimulator';
import ShootingDetail from './pages/ShootingDetail';
import ApertureDetail from './pages/ApertureDetail';
import ShutterDetail from './pages/ShutterDetail';
import IsoDetail from './pages/IsoDetail';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />
        <Route path="/scene-simulator" element={<SceneSimulator />} />
        <Route path="/shooting-detail" element={<ShootingDetail />} />
        <Route path="/aperture" element={<ApertureDetail />} />
        <Route path="/shutter" element={<ShutterDetail />} />
        <Route path="/iso" element={<IsoDetail />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
