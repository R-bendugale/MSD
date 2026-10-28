import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { errMsg } from '../api';
import { Loader, ErrorBox, StarInput } from '../components/Common';
import { fmtDuration, fmtTime } from '../utils';

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function Learn() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [current, setCurrent] = useState(null);
  const [rate, setRate] = useState(1);
  const [autoplay, setAutoplay] = useState(false);
  const [rv, setRv] = useState({ rating: 0, comment: '' });
  const [rvMsg, setRvMsg] = useState('');
  const videoRef = useRef(null);
  const pendingSeek = useRef(null);
  const lastSave = useRef(0);

  const lessons = useMemo(() => (data ? data.sections.flatMap((s) => s.lessons) : []), [data]);
  const enrollment = data?.enrollment;
  const done = useMemo(() => new Set((enrollment?.completedLessons || []).map(String)), [enrollment]);

  useEffect(() => {
    api.get(`/learn/${courseId}`).then(({ data: res }) => {
      const d = res.data;
      setData(d);
      if (d.myReview) setRv({ rating: d.myReview.rating, comment: d.myReview.comment || '' });
      const all = d.sections.flatMap((s) => s.lessons);
      const doneSet = new Set((d.enrollment?.completedLessons || []).map(String));
      const lw = d.enrollment?.lastWatched;
      const start = all.find((l) => l._id === lw?.lesson) || all.find((l) => !doneSet.has(l._id)) || all[0];
      if (lw?.lesson === start?._id) pendingSeek.current = lw.position;
      setCurrent(start || null);
    }).catch((e) => setErr(errMsg(e)));
  }, [courseId]);

  if (err) return <ErrorBox>{err}</ErrorBox>;
  if (!data) return <Loader />;
  const { course, sections } = data;

  const save = async (body) => {
    if (!enrollment) return; // instructors/admins previewing
    try {
      const { data: res } = await api.patch(`/learn/${courseId}/progress`, body);
      setData((d) => ({ ...d, enrollment: res.data.enrollment }));
    } catch { /* ignore */ }
  };

  const select = (lesson, seek = null) => {
    pendingSeek.current = seek;
    setCurrent(lesson);
  };
  const idx = lessons.findIndex((l) => l._id === current?._id);
  const next = lessons[idx + 1];

  const onMeta = () => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = rate;
    if (pendingSeek.current) { v.currentTime = pendingSeek.current; pendingSeek.current = null; }
  };
  const onTime = () => {
    const v = videoRef.current;
    if (v && Date.now() - lastSave.current > 10000) {
      lastSave.current = Date.now();
      save({ lessonId: current._id, position: v.currentTime });
    }
  };
  const onEnded = async () => {
    await save({ lessonId: current._id, completed: true, position: 0 });
    if (next) { setAutoplay(true); select(next); }
  };
  const changeRate = (r) => { setRate(r); if (videoRef.current) videoRef.current.playbackRate = r; };
  const toggleDone = () => save({ lessonId: current._id, completed: !done.has(current._id), position: videoRef.current?.currentTime || 0 });

  const addBookmark = async () => {
    const note = window.prompt('Bookmark note (optional):') ?? null;
    if (note === null) return;
    const { data: res } = await api.post(`/learn/${courseId}/bookmarks`, { lessonId: current._id, time: videoRef.current?.currentTime || 0, note });
    setData((d) => ({ ...d, enrollment: res.data.enrollment }));
  };
  const delBookmark = async (id) => {
    const { data: res } = await api.delete(`/learn/${courseId}/bookmarks/${id}`);
    setData((d) => ({ ...d, enrollment: res.data.enrollment }));
  };
  const jump = (b) => {
    if (b.lesson === current._id) { if (videoRef.current) videoRef.current.currentTime = b.time; }
    else select(lessons.find((l) => l._id === b.lesson), b.time);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!rv.rating) return setRvMsg('Please choose a star rating');
    try { await api.post(`/courses/${courseId}/reviews`, rv); setRvMsg('Thanks! Your review has been saved.'); }
    catch (e2) { setRvMsg(errMsg(e2)); }
  };

  const bookmarks = (enrollment?.bookmarks || []).filter((b) => b.lesson === current?._id);
  const pct = enrollment?.percentComplete || 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link to="/my-learning" className="text-sm text-indigo-600">← My learning</Link>
          <h1 className="text-lg font-bold">{course.title}</h1>
        </div>

        {current ? (
          <>
            {current.type === 'video' && current.video?.url ? (
              <video key={current._id} ref={videoRef} src={current.video.url} controls autoPlay={autoplay} onLoadedMetadata={onMeta} onTimeUpdate={onTime} onEnded={onEnded} className="aspect-video w-full rounded-xl bg-black" />
            ) : (
              <div className="card whitespace-pre-wrap p-6 text-sm">{current.content || 'No content for this lesson yet.'}</div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <h2 className="mr-auto text-xl font-bold">{current.title}</h2>
              {current.type === 'video' && (
                <>
                  <label className="flex items-center gap-2 text-sm">
                    Speed
                    <select className="input !w-auto !py-1" value={rate} onChange={(e) => changeRate(Number(e.target.value))}>
                      {RATES.map((r) => <option key={r} value={r}>{r}x</option>)}
                    </select>
                  </label>
                  {enrollment && <button className="btn btn-outline btn-sm" onClick={addBookmark}>🔖 Bookmark</button>}
                </>
              )}
              {enrollment && (
                <button className={`btn btn-sm ${done.has(current._id) ? 'btn-outline' : 'btn-primary'}`} onClick={toggleDone}>
                  {done.has(current._id) ? '✓ Completed' : 'Mark complete'}
                </button>
              )}
              {next && <button className="btn btn-outline btn-sm" onClick={() => { setAutoplay(true); select(next); }}>Next →</button>}
            </div>
            {current.description && <p className="text-sm text-slate-600">{current.description}</p>}

            {bookmarks.length > 0 && (
              <div className="card p-4">
                <h3 className="mb-2 text-sm font-bold">Your bookmarks</h3>
                <ul className="space-y-1 text-sm">
                  {bookmarks.map((b) => (
                    <li key={b._id} className="flex items-center justify-between">
                      <button className="text-indigo-600 hover:underline" onClick={() => jump(b)}>{fmtTime(b.time)} {b.note && `– ${b.note}`}</button>
                      <button className="text-xs text-red-600" onClick={() => delBookmark(b._id)}>delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : <p>This course has no lessons yet.</p>}

        {enrollment && (
          <form onSubmit={submitReview} className="card space-y-3 p-5">
            <h3 className="font-bold">Rate this course</h3>
            <StarInput value={rv.rating} onChange={(n) => setRv({ ...rv, rating: n })} />
            <textarea className="input" rows={3} placeholder="Share your experience (optional)" value={rv.comment} onChange={(e) => setRv({ ...rv, comment: e.target.value })} />
            <div className="flex items-center gap-3">
              <button className="btn btn-primary btn-sm">Save review</button>
              {rvMsg && <span className="text-sm text-slate-600">{rvMsg}</span>}
            </div>
          </form>
        )}
      </div>

      <aside className="card h-fit overflow-hidden lg:sticky lg:top-20">
        <div className="space-y-2 border-b border-slate-200 p-4">
          <div className="text-sm font-bold">Course progress</div>
          {enrollment ? (
            <>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-indigo-600 transition-all" style={{ width: `${pct}%` }} /></div>
              <div className="text-xs text-slate-500">{pct}% complete</div>
              {enrollment.completedAt && <Link to={`/certificate/${courseId}`} className="btn btn-primary btn-sm w-full">🏆 Get certificate</Link>}
            </>
          ) : <div className="text-xs text-slate-500">Preview mode (progress not tracked)</div>}
        </div>
        <div className="max-h-[65vh] overflow-y-auto">
          {sections.map((s) => (
            <div key={s._id}>
              <div className="bg-slate-50 px-4 py-2 text-sm font-semibold">{s.title}</div>
              {s.lessons.map((l) => (
                <button key={l._id} onClick={() => select(l)} className={`flex w-full items-start gap-2 px-4 py-2.5 text-left text-sm hover:bg-slate-50 ${current?._id === l._id ? 'bg-indigo-50 font-semibold' : ''}`}>
                  <span className={done.has(l._id) ? 'text-green-600' : 'text-slate-400'}>{done.has(l._id) ? '✓' : '○'}</span>
                  <span className="flex-1">{l.title}<span className="block text-xs font-normal text-slate-500">{l.type === 'video' ? fmtDuration(l.video?.duration) : l.type}</span></span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
