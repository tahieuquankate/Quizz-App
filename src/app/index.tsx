// GIAO DIỆN demo app trắc nghiệm (3 màn hình: Trang chủ, Làm bài, Kết quả)
// Chạy: dán file này đè lên App.js của project Expo (hoặc import vào App.js)
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// ---------- 1. BẢNG MÀU: sửa ở đây là đổi cả app ----------
const C = {
  bg: '#F6F4FB', card: '#FFFFFF', text: '#1E1B2E', sub: '#6B6880', line: '#E4E0F0',
  primary: '#5B3FD9', primarySoft: '#ECE8FB',
  amber: '#FFB703', amberSoft: '#FFF3D1',
  green: '#12A150', greenSoft: '#DDF5E7',
  red: '#E5484D', redSoft: '#FDE6E7',
};

// ---------- 2. DỮ LIỆU GIẢ (chỉ để dựng giao diện) ----------
const EXAMS = [
  { id: 1, title: 'Kiểm tra 15 phút - Chương 2', subject: 'Lập trình hướng đối tượng', info: '10 câu • 15 phút', status: 'new', icon: '💻', tint: C.primarySoft, fg: C.primary },
  { id: 2, title: 'Ôn tập giữa kỳ', subject: 'Cấu trúc dữ liệu', info: '20 câu • 30 phút', status: 'new', icon: '🌳', tint: '#E3EEFB', fg: '#1F5FA8' },
  { id: 3, title: 'Trắc nghiệm SQL cơ bản', subject: 'Cơ sở dữ liệu', info: '15 câu • 20 phút', status: 'done', score: '8.5', icon: '🗄️', tint: C.greenSoft, fg: '#0B7A3C' },
];

const TABS = [
  { icon: '🏠', label: 'Trang chủ' },
  { icon: '📝', label: 'Bài thi' },
  { icon: '📊', label: 'Kết quả' },
  { icon: '👤', label: 'Cá nhân' },
];

const QUESTIONS = [
  { q: 'Tính đóng gói (encapsulation) trong OOP nghĩa là gì?', options: ['Một lớp kế thừa lớp khác', 'Che giấu dữ liệu bên trong đối tượng', 'Một hàm có nhiều dạng', 'Tạo nhiều đối tượng từ một lớp'], correct: 1 },
  { q: 'Cấu trúc dữ liệu nào hoạt động theo nguyên tắc vào sau ra trước?', options: ['Queue', 'Stack', 'Array', 'Graph'], correct: 1 },
  { q: 'Lệnh SQL nào dùng để lấy dữ liệu từ bảng?', options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'], correct: 2 },
  { q: 'Độ phức tạp của tìm kiếm nhị phân là?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
  { q: 'Giao thức nào thường dùng để truy cập web an toàn?', options: ['FTP', 'HTTP', 'HTTPS', 'SMTP'], correct: 2 },
];

// ---------- 3. MÀN HÌNH TRANG CHỦ ----------
function HomeScreen({ onStart }) {
  const [code, setCode] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 24 }}>
        {/* Logo + avatar */}
        <View style={s.topRow}>
          <Text style={s.logo}>QuizApp</Text>
          <View style={s.avatar}><Text style={s.avatarText}>Q</Text></View>
        </View>

        {/* Khung nhập mã lớp để vào thi */}
        <View style={s.joinBox}>
          <Text style={s.joinTitle}>Nhập mã lớp để vào thi</Text>
          <Text style={s.joinSub}>Mã do giáo viên cung cấp</Text>
          <View style={s.joinRow}>
            <TextInput
              style={s.input}
              placeholder="Ví dụ: AB12CD"
              placeholderTextColor="#A9A5BD"
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={s.joinBtn} onPress={onStart}>
              <Text style={s.joinBtnText}>Vào thi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Thống kê nhanh */}
        <Text style={s.sectionTitle}>Tổng quan học tập</Text>
        <View style={s.statsRow}>
          <View style={s.statBox}><Text style={s.statIcon}>📋</Text><Text style={s.statNum}>12</Text><Text style={s.statLabel}>Bài đã làm</Text></View>
          <View style={s.statBox}><Text style={s.statIcon}>📈</Text><Text style={s.statNum}>8.2</Text><Text style={s.statLabel}>Điểm trung bình</Text></View>
          <View style={s.statBox}><Text style={s.statIcon}>⏰</Text><Text style={s.statNum}>3</Text><Text style={s.statLabel}>Chờ làm</Text></View>
        </View>

        {/* Danh sách đề */}
        <View style={s.sectionRow}>
          <Text style={[s.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>Đề của bạn</Text>
          <Text style={s.seeAll}>Xem tất cả ›</Text>
        </View>
        {EXAMS.map((e) => (
          <TouchableOpacity key={e.id} style={s.examCard} onPress={onStart}>
            <View style={[s.examIcon, { backgroundColor: e.tint }]}>
              <Text style={{ fontSize: 20 }}>{e.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.examSubject, { color: e.fg }]}>{e.subject}</Text>
              <Text style={s.examTitle}>{e.title}</Text>
              <Text style={s.examInfo}>{e.info}</Text>
            </View>
            {e.status === 'done' ? (
              <View style={[s.chip, { backgroundColor: C.greenSoft }]}>
                <Text style={[s.chipText, { color: C.green }]}>{e.score} điểm</Text>
              </View>
            ) : (
              <View style={[s.chip, { backgroundColor: C.amberSoft }]}>
                <Text style={[s.chipText, { color: '#9A6700' }]}>Chưa làm</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Thanh điều hướng dưới (chỉ là giao diện) */}
      <View style={s.tabBar}>
        {TABS.map((t, i) => (
          <View key={t.label} style={s.tab}>
            <Text style={[s.tabIcon, i !== 0 && { opacity: 0.45 }]}>{t.icon}</Text>
            <Text style={[s.tabLabel, i === 0 && { color: C.primary, fontWeight: '700' }]}>{t.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ---------- 4. MÀN HÌNH LÀM BÀI ----------
function ExamScreen({ onSubmit, onBack }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { 0: 1 } = câu 1 chọn B
  const [flags, setFlags] = useState({});     // { 2: true } = câu 3 đã đánh dấu xem lại
  const [showMap, setShowMap] = useState(false);

  const q = QUESTIONS[idx];
  const total = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isLast = idx === total - 1;

  const chosen = answers[idx];            // đáp án đã chọn ở câu hiện tại (undefined = chưa chọn)
  const hasAnswered = chosen !== undefined;
  const isCorrect = chosen === q.correct; // chọn đúng hay sai

  const choose = (i) => {
    if (hasAnswered) return; // đã chọn rồi thì khóa lại, không cho đổi đáp án
    setAnswers({ ...answers, [idx]: i });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Thanh trên: quay lại, tên đề, đồng hồ */}
      <View style={s.examHeader}>
        <TouchableOpacity onPress={onBack}><Text style={s.back}>✕</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Kiểm tra 15 phút</Text>
        <View style={s.timerPill}><Text style={s.timerText}>⏱ 14:32</Text></View>
      </View>

      {/* Thanh tiến độ */}
      <View style={s.progressTrack}>
        <View style={[s.progressFill, { width: `${(answeredCount / total) * 100}%` }]} />
      </View>
      <Text style={s.progressText}>Đã làm {answeredCount}/{total} câu</Text>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={s.questionCard}>
          <View style={s.qTopRow}>
            <Text style={s.qNumber}>Câu {idx + 1}</Text>
            <TouchableOpacity onPress={() => setFlags({ ...flags, [idx]: !flags[idx] })}>
              <Text style={[s.flagBtn, flags[idx] && { color: '#9A6700' }]}>
                {flags[idx] ? '🚩 Đã đánh dấu' : '⚑ Đánh dấu xem lại'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={s.qText}>{q.q}</Text>
        </View>

        {q.options.map((opt, i) => {
          const picked = chosen === i;
          const wrongPick = picked && !isCorrect; // chọn ô này và bị sai
          const rightPick = picked && isCorrect;  // chọn ô này và đúng
          return (
            <TouchableOpacity
              key={i}
              style={[s.option, wrongPick && s.optionWrong, rightPick && s.optionRight]}
              onPress={() => choose(i)}
              activeOpacity={hasAnswered ? 1 : 0.7}
            >
              <View style={[s.letter, wrongPick && { backgroundColor: C.red }, rightPick && { backgroundColor: C.green }]}>
                <Text style={[s.letterText, picked && { color: '#fff' }]}>{'ABCD'[i]}</Text>
              </View>
              <Text style={s.optionText}>{opt}</Text>
              {wrongPick && <View style={[s.tick, { backgroundColor: C.red }]}><Text style={s.tickText}>✕</Text></View>}
              {rightPick && <View style={[s.tick, { backgroundColor: C.green }]}><Text style={s.tickText}>✓</Text></View>}
            </TouchableOpacity>
          );
        })}

        {/* Khung phản hồi: hiện ngay sau khi chọn đáp án */}
        {hasAnswered && (
          <View style={[s.feedback, isCorrect ? s.feedbackRight : s.feedbackWrong]}>
            <View style={[s.feedbackIcon, { backgroundColor: isCorrect ? C.green : C.red }]}>
              <Text style={s.tickText}>{isCorrect ? '✓' : '✕'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.feedbackTitle, { color: isCorrect ? C.green : C.red }]}>
                {isCorrect ? 'Chính xác!' : 'Sai rồi!'}
              </Text>
              {!isCorrect && (
                <Text style={s.feedbackText}>
                  Đáp án đúng là: {'ABCD'[q.correct]}. {q.options[q.correct]}.
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bảng chọn nhanh câu hỏi */}
      {showMap && (
        <View style={s.mapSheet}>
          <Text style={s.mapTitle}>Danh sách câu hỏi</Text>
          <View style={s.mapGrid}>
            {QUESTIONS.map((_, i) => {
              let bg = C.bg, color = C.sub;
              if (answers[i] !== undefined) { bg = C.primarySoft; color = C.primary; }
              if (flags[i]) { bg = C.amberSoft; color = '#9A6700'; }
              return (
                <TouchableOpacity
                  key={i}
                  style={[s.mapCell, { backgroundColor: bg }, i === idx && s.mapCellNow]}
                  onPress={() => { setIdx(i); setShowMap(false); }}
                >
                  <Text style={[s.mapCellText, { color }]}>{i + 1}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={s.legend}>Tím: đã làm • Vàng: đánh dấu • Xám: chưa làm</Text>
        </View>
      )}

      {/* Thanh điều khiển dưới cùng */}
      <View style={s.bottomBar}>
        <TouchableOpacity style={s.ghostBtn} onPress={() => setIdx(Math.max(idx - 1, 0))}>
          <Text style={s.ghostText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.mapBtn} onPress={() => setShowMap(!showMap)}>
          <Text style={s.mapBtnText}>▦ Câu hỏi</Text>
        </TouchableOpacity>
        {isLast ? (
          <TouchableOpacity style={s.mainBtn} onPress={() => onSubmit(answers)}>
            <Text style={s.mainBtnText}>Nộp bài</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.mainBtn} onPress={() => setIdx(idx + 1)}>
            <Text style={s.mainBtnText}>Câu sau ›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ---------- 5. MÀN HÌNH KẾT QUẢ ----------
function ResultScreen({ answers, onHome }) {
  const total = QUESTIONS.length;
  const correct = QUESTIONS.filter((q, i) => answers[i] === q.correct).length;
  const skipped = total - Object.keys(answers).length;
  const wrong = total - correct - skipped;
  const score = ((correct / total) * 10).toFixed(1);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 70, alignItems: 'center' }}>
      <View style={s.scoreCircle}>
        <Text style={s.scoreNum}>{score}</Text>
        <Text style={s.scoreMax}>/ 10</Text>
      </View>
      <Text style={s.resultTitle}>{correct >= total / 2 ? 'Làm tốt lắm!' : 'Cố gắng thêm nhé!'}</Text>
      <Text style={s.helloSub}>Bạn đúng {correct}/{total} câu</Text>

      <View style={s.statsRow}>
        <View style={[s.statBox, { backgroundColor: C.greenSoft }]}><Text style={[s.statNum, { color: C.green }]}>{correct}</Text><Text style={s.statLabel}>Đúng</Text></View>
        <View style={[s.statBox, { backgroundColor: C.redSoft }]}><Text style={[s.statNum, { color: C.red }]}>{wrong}</Text><Text style={s.statLabel}>Sai</Text></View>
        <View style={[s.statBox, { backgroundColor: C.amberSoft }]}><Text style={[s.statNum, { color: '#9A6700' }]}>{skipped}</Text><Text style={s.statLabel}>Bỏ qua</Text></View>
      </View>

      <TouchableOpacity style={[s.mainBtn, { alignSelf: 'stretch', marginTop: 24, paddingVertical: 16 }]} onPress={onHome}>
        <Text style={s.mainBtnText}>Về trang chủ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ---------- 6. APP: chuyển qua lại giữa 3 màn hình ----------
export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'exam' | 'result'
  const [answers, setAnswers] = useState({});

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {screen === 'home' && <HomeScreen onStart={() => setScreen('exam')} />}
      {screen === 'exam' && (
        <ExamScreen
          onBack={() => setScreen('home')}
          onSubmit={(a) => { setAnswers(a); setScreen('result'); }}
        />
      )}
      {screen === 'result' && <ResultScreen answers={answers} onHome={() => setScreen('home')} />}
    </View>
  );
}

// ---------- 7. STYLE ----------
const s = StyleSheet.create({
  // Trang chủ
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: '800', color: '#3C2A9E' },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  helloSub: { fontSize: 15, color: C.sub, marginTop: 4 },
  joinBox: { backgroundColor: C.primary, borderRadius: 18, padding: 18, marginTop: 18 },
  joinTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  joinSub: { color: '#D9D2F7', fontSize: 13, marginTop: 2, marginBottom: 12 },
  joinRow: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  joinBtn: { backgroundColor: C.amber, borderRadius: 12, paddingHorizontal: 18, justifyContent: 'center' },
  joinBtnText: { fontWeight: '800', color: C.text },
  statsRow: { flexDirection: 'row', gap: 10, alignSelf: 'stretch' },
  statBox: { flex: 1, backgroundColor: C.card, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center', borderWidth: 1, borderColor: C.line },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statNum: { fontSize: 24, fontWeight: '800', color: C.text },
  statLabel: { fontSize: 12, color: C.sub, marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.text, marginTop: 24, marginBottom: 12 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 12 },
  seeAll: { fontSize: 13, color: C.primary, fontWeight: '600' },
  examCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: C.line },
  examIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  examSubject: { fontSize: 12, fontWeight: '600' },
  examTitle: { fontSize: 15, fontWeight: '700', color: C.text, marginTop: 2 },
  examInfo: { fontSize: 13, color: C.sub, marginTop: 3 },
  chip: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  chipText: { fontSize: 12, fontWeight: '700' },
  tabBar: { flexDirection: 'row', backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.line, paddingTop: 10, paddingBottom: 24 },
  tab: { flex: 1, alignItems: 'center' },
  tabIcon: { fontSize: 22 },
  tabLabel: { fontSize: 11, color: C.sub, marginTop: 2 },

  // Làm bài
  examHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingHorizontal: 20 },
  back: { fontSize: 20, color: C.sub, width: 30 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.text },
  timerPill: { backgroundColor: C.redSoft, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  timerText: { color: C.red, fontWeight: '700' },
  progressTrack: { height: 6, backgroundColor: C.line, borderRadius: 3, marginHorizontal: 20, marginTop: 16 },
  progressFill: { height: 6, backgroundColor: C.primary, borderRadius: 3 },
  progressText: { fontSize: 12, color: C.sub, marginHorizontal: 20, marginTop: 6 },
  questionCard: { backgroundColor: C.card, borderRadius: 18, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: C.line },
  qTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  qNumber: { fontWeight: '800', color: C.primary },
  flagBtn: { fontSize: 13, color: C.sub },
  qText: { fontSize: 18, fontWeight: '600', color: C.text, lineHeight: 26 },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: C.line },
  optionWrong: { borderColor: C.red, backgroundColor: C.redSoft },
  optionRight: { borderColor: C.green, backgroundColor: C.greenSoft },
  letter: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  letterText: { fontWeight: '800', color: C.sub },
  optionText: { flex: 1, fontSize: 15, color: C.text },
  tick: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  tickText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  feedback: { flexDirection: 'row', alignItems: 'flex-start', borderRadius: 14, padding: 14, marginTop: 6, borderWidth: 1 },
  feedbackWrong: { backgroundColor: C.redSoft, borderColor: '#F5B5B8' },
  feedbackRight: { backgroundColor: C.greenSoft, borderColor: '#A8E0BF' },
  feedbackIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  feedbackTitle: { fontSize: 17, fontWeight: '800' },
  feedbackText: { fontSize: 14, color: C.text, marginTop: 4, lineHeight: 20 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 28, backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.line },
  ghostBtn: { width: 48, borderRadius: 12, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' },
  ghostText: { fontSize: 24, color: C.sub },
  mapBtn: { flex: 1, borderRadius: 12, backgroundColor: C.primarySoft, alignItems: 'center', justifyContent: 'center' },
  mapBtnText: { color: C.primary, fontWeight: '700' },
  mainBtn: { flex: 1, borderRadius: 12, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  mainBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  mapSheet: { position: 'absolute', bottom: 88, left: 16, right: 16, backgroundColor: C.card, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: C.line, elevation: 8 },
  mapTitle: { fontWeight: '700', color: C.text, marginBottom: 12 },
  mapGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  mapCell: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  mapCellNow: { borderWidth: 2, borderColor: C.primary },
  mapCellText: { fontWeight: '800' },
  legend: { fontSize: 12, color: C.sub, marginTop: 12 },

  // Kết quả
  scoreCircle: { width: 170, height: 170, borderRadius: 85, borderWidth: 10, borderColor: C.primary, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center' },
  scoreNum: { fontSize: 52, fontWeight: '800', color: C.primary },
  scoreMax: { fontSize: 14, color: C.sub },
  resultTitle: { fontSize: 20, fontWeight: '800', color: C.text, marginTop: 20 },
});