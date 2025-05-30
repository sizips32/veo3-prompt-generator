import { SelectOption } from './types';

export const VISUAL_STYLES: SelectOption[] = [
  { value: "", label: "선택안함" },
  { value: "Cinematic", label: "영화처럼 (Cinematic)" },
  { value: "Photorealistic", label: "사진처럼 사실적인 (Photorealistic)" },
  { value: "Anime", label: "애니메이션 (Anime)" },
  { value: "Documentary", label: "다큐멘터리 (Documentary)" },
  { value: "Abstract", label: "추상적 (Abstract)" },
  { value: "Pixel Art", label: "픽셀 아트 (Pixel Art)" },
  { value: "Watercolor", label: "수채화 (Watercolor)" },
  { value: "Claymation", label: "클레이메이션 (Claymation)" },
  { value: "3D Render", label: "3D 렌더 (3D Render)" },
  { value: "Low Poly", label: "로우 폴리 (Low Poly)" },
  { value: "Isometric", label: "아이소메트릭 (Isometric)" },
];

export const CAMERA_ANGLES: SelectOption[] = [
  { value: "", label: "선택안함" },
  { value: "Eye-level Shot", label: "눈높이 샷 (Eye-level Shot)" },
  { value: "Close-up", label: "클로즈업 (Close-up)" },
  { value: "Extreme Close-up", label: "익스트림 클로즈업 (Extreme Close-up)" },
  { value: "Medium Shot", label: "미디엄 샷 (Medium Shot)" },
  { value: "Long Shot", label: "롱 샷 (Long Shot)" },
  { value: "Wide Shot", label: "와이드 샷 (Wide Shot)" },
  { value: "Aerial View", label: "항공뷰 (Aerial View)" },
  { value: "Drone Shot", label: "드론 샷 (Drone Shot)" },
  { value: "Point of View (POV)", label: "1인칭 시점 (Point of View)" },
  { value: "Low Angle", label: "로우 앵글 (Low Angle)" },
  { value: "High Angle", label: "하이 앵글 (High Angle)" },
  { value: "Overhead Shot", label: "오버헤드 샷 (Overhead Shot)" },
];

export const CAMERA_MOVEMENTS: SelectOption[] = [
  { value: "", label: "선택안함" },
  { value: "Static", label: "고정 (Static)" },
  { value: "Pan Left", label: "팬 왼쪽 (Pan Left)" },
  { value: "Pan Right", label: "팬 오른쪽 (Pan Right)" },
  { value: "Tilt Up", label: "틸트 업 (Tilt Up)" },
  { value: "Tilt Down", label: "틸트 다운 (Tilt Down)" },
  { value: "Zoom In", label: "줌 인 (Zoom In)" },
  { value: "Zoom Out", label: "줌 아웃 (Zoom Out)" },
  { value: "Dolly Zoom", label: "돌리 줌 (Dolly Zoom)" },
  { value: "Tracking Shot", label: "트래킹 샷 (Tracking Shot)" },
  { value: "Crane Shot", label: "크레인 샷 (Crane Shot)" },
  { value: "Handheld", label: "핸드헬드 (Handheld)" },
  { value: "Slow Motion", label: "슬로우 모션 (Slow Motion)" },
  { value: "Fast Motion", label: "패스트 모션 (Fast Motion)" },
];

export const LIGHTING_STYLES: SelectOption[] = [
  { value: "", label: "선택안함" },
  { value: "Natural Light", label: "자연광 (Natural Light)" },
  { value: "Studio Light", label: "스튜디오 조명 (Studio Light)" },
  { value: "Golden Hour", label: "골든 아워 (Golden Hour)" },
  { value: "Blue Hour", label: "블루 아워 (Blue Hour)" },
  { value: "Noir", label: "느와르 (Noir)" },
  { value: "High Key", label: "하이키 (High Key)" },
  { value: "Low Key", label: "로우키 (Low Key)" },
  { value: "Backlight", label: "역광 (Backlight)" },
  { value: "Rim Light", label: "림 라이트 (Rim Light)" },
  { value: "Volumetric Lighting", label: "볼륨 조명 (Volumetric Lighting)" },
  { value: "Neon Lights", label: "네온 조명 (Neon Lights)" },
];

export const COLOR_PALETTES: SelectOption[] = [
  { value: "", label: "선택안함" },
  { value: "Vibrant", label: "생생한 (Vibrant)" },
  { value: "Monochromatic", label: "단색 (Monochromatic)" },
  { value: "Pastel", label: "파스텔 (Pastel)" },
  { value: "Neon", label: "네온 (Neon)" },
  { value: "Sepia", label: "세피아 (Sepia)" },
  { value: "Muted", label: "차분한 (Muted)" },
  { value: "Warm Colors", label: "따뜻한 색감 (Warm Colors)" },
  { value: "Cool Colors", label: "차가운 색감 (Cool Colors)" },
  { value: "Black and White", label: "흑백 (Black and White)" },
  { value: "Technicolor", label: "테크니컬러 (Technicolor)"},
];

export const TIMES_OF_DAY: SelectOption[] = [
  { value: "", label: "선택안함" },
  { value: "Morning", label: "아침 (Morning)" },
  { value: "Noon", label: "정오 (Noon)" },
  { value: "Afternoon", label: "오후 (Afternoon)" },
  { value: "Evening", label: "저녁 (Evening)" },
  { value: "Night", label: "밤 (Night)" },
  { value: "Sunrise", label: "일출 (Sunrise)" },
  { value: "Sunset", label: "일몰 (Sunset)" },
  { value: "Twilight", label: "황혼 (Twilight)" },
  { value: "Midnight", label: "자정 (Midnight)" },
];

export const ASPECT_RATIOS: SelectOption[] = [
  { value: "", label: "선택안함" },
  { value: "16:9", label: "16:9 (와이드스크린)" },
  { value: "9:16", label: "9:16 (세로)" },
  { value: "1:1", label: "1:1 (정사각형)" },
  { value: "4:3", label: "4:3 (표준)" },
  { value: "2.39:1", label: "2.39:1 (시네마스코프)" },
  { value: "3:2", label: "3:2" },
  { value: "5:4", label: "5:4" },
];