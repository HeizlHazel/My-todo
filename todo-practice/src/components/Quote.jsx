import "./Quote.css";
import { useEffect, useState } from "react";

const Quote = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });
  // CORS 오류로 막아둠
  //  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const koreanQuotes = [
  //       { content: "천 리 길도 한 걸음부터", author: "노자" },
  //       { content: "시작이 반이다", author: "속담" },
  //       {
  //         content: "오늘 할 수 있는 일을 내일로 미루지 마라",
  //         author: "벤자민 프랭클린",
  //       },
  //       { content: "실패는 성공의 어머니", author: "속담" },
  //       { content: "최선을 다하면 된다", author: "익명" },
  //     ];

  //     const today = new Date();
  //     const seed =
  //       today.getFullYear() * 10000 +
  //       (today.getMonth() + 1) * 100 +
  //       today.getDate();

  //     console.log("Fetching quote with seed:", seed); // 디버깅용

  //     fetch(`https://api.quotable.io/random?seed=${seed}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Quote data: ", data); //디버깅
  //         setQuote({
  //           content: data.content,
  //           author: data.author,
  //         });
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error("명언을 불러오는데 실패했습니다: ", err);
  //         const todayQuote = koreanQuotes[today.getDate() % koreanQuotes.length];
  //         // setQuote({
  //         //   content: "Start your day with purpose",
  //         //   author: "Anonymous",
  //         // });
  //         setQuote(todayQuote);
  //         setLoading(false);
  //       });
  //   }, []);

  useEffect(() => {
    const quotes = [
      { content: "천 리 길도 한 걸음부터", author: "노자" },
      { content: "시작이 반이다", author: "속담" },
      {
        content: "오늘 할 수 있는 일을 내일로 미루지 마라",
        author: "벤자민 프랭클린",
      },
      { content: "실패는 성공의 어머니", author: "속담" },
      { content: "최선을 다하면 된다. 완벽하지 않아도 괜찮다", author: "익명" },
      { content: "작은 일을 소홀히 여기지 말라", author: "공자" },
      { content: "하루하루를 삶의 마지막 날처럼 살아라", author: "세네카" },
      {
        content:
          "고통이 남기고 간 뒤를 보라. 고난이 지나면 반드시 기쁨이 스며든다",
        author: "괴테",
      },
      { content: "행복은 습관이다. 그것을 몸에 지니라", author: "허버드" },
      { content: "나는 생각한다, 고로 존재한다", author: "데카르트" },
      { content: "꿈을 지켜라. 꿈이 없으면 희망이 없다", author: "괴테" },
      { content: "할 수 있다고 믿는 사람은 결국 할 수 있다", author: "버질" },
      {
        content: "위대한 일을 하려면 행동할 뿐만 아니라 꿈을 꾸어야 한다",
        author: "아나톨 프랑스",
      },
      { content: "기회는 준비된 자에게만 온다", author: "루이 파스퇴르" },
      { content: "삶이 있는 한 희망은 있다", author: "키케로" },
      { content: "배우기를 멈추는 사람은 늙은 사람이다", author: "헨리 포드" },
      {
        content:
          "진정한 용기는 두려움이 없는 것이 아니라 두려움에도 불구하고 행동하는 것이다",
        author: "넬슨 만델라",
      },
      {
        content: "변화를 두려워하지 마라. 더 나은 것을 위한 기회다",
        author: "익명",
      },
      { content: "작은 발걸음도 목표를 향한 진전이다", author: "익명" },
      { content: "포기하지 않으면 실패하지 않는다", author: "익명" },
      { content: "오늘의 노력은 내일의 행복이다", author: "익명" },
      {
        content: "시간은 가장 귀중한 자산이다. 현명하게 사용하라",
        author: "익명",
      },
      { content: "매일 조금씩 나아지면 큰 변화가 일어난다", author: "익명" },
      {
        content: "당신이 할 수 있다고 생각하든 없다고 생각하든 당신이 옳다",
        author: "헨리 포드",
      },
      { content: "성공은 매일의 작은 노력들이 쌓인 결과다", author: "익명" },
      { content: "지금 이 순간이 가장 중요하다", author: "익명" },
      { content: "완벽을 기다리지 말고 시작하라", author: "익명" },
      { content: "어제보다 나은 오늘을 만들어라", author: "익명" },
      { content: "긍정적인 마음가짐이 긍정적인 결과를 만든다", author: "익명" },
      { content: "목표를 향한 첫 걸음이 가장 중요하다", author: "익명" },
      {
        content: "할 수 있다는 믿음이 반은 이룬 것이다",
        author: "시어도어 루스벨트",
      },
    ];

    const today = new Date();
    // 날짜 기반으로 매일 같은 명언
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    const todayQuote = quotes[dayOfYear % quotes.length];

    setQuote(todayQuote);
  }, []);

  return (
    <div>
      <div className="quote-section">
        <p className="quote-text">"{quote.content}"</p>
        <p className="quote-author">{quote.author}</p>
      </div>
    </div>
  );
};

export default Quote;
