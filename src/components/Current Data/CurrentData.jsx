import { useRef, useEffect, useState } from 'react';
import clear from "../../assets/clear.svg";
import "./CurrentData.css";

function CurrentData({ weather }) {
    console.log(weather);
    const scrollRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0);
    const hourlyData = weather.forecast.forecastday[0].hour;
    const now = new Date();
    const currentHour = now.getHours() + 12;
    const upcomingData = hourlyData.slice(currentHour, currentHour + 6);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;


        const updateCardWidth = () => {
            const containerWidth = container.offsetWidth;
            const padding = 32;
            const gaps = 12;
            const calculatedWidth = (containerWidth - padding - gaps) / 4;
            setCardWidth(calculatedWidth);

            // Применяем ширину ко всем карточкам
            const cards = container.querySelectorAll('.table');
            cards.forEach(card => {
                card.style.width = `${calculatedWidth}px`;
            });
        };

        updateCardWidth();
        window.addEventListener('resize', updateCardWidth);

        // Обработчик скролла для snap-эффекта
        let isScrolling = false;
        let scrollTimeout;

        const handleScrollEnd = () => {
            if (isScrolling) return;

            const scrollLeft = container.scrollLeft;
            const cardStep = cardWidth + 12;
            const currentIndex = Math.round(scrollLeft / cardStep);
            const targetPosition = currentIndex * cardStep;

            if (Math.abs(scrollLeft - targetPosition) > 2) {
                container.scrollTo({
                    left: targetPosition,
                    behavior: 'smooth'
                });
            }
        };

        const onScroll = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                handleScrollEnd();
            }, 100);
        };

        container.addEventListener('scroll', onScroll);

        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateCardWidth);
            clearTimeout(scrollTimeout);
        };
    }, [cardWidth]);

    return (
        <>
            <div className="img_data">
                <img
                    src={clear}
                    alt="sunny"
                    style={{ width: "200px", height: "200px" }}
                />
            </div>
            <div className="temperature_data">{`${Math.round(weather.current.temp_c)}°С`}</div>
            <div className="name_city">
                <h3>{weather.location.name}</h3>
            </div>
            <div className="divider"></div>
            <div className="hourly_data" ref={scrollRef}>
                {upcomingData.map((data, idx) => (
                    <div className="table" key={idx}>
                        <h5>
                            {idx === 0 ? "Now" : `${new Date(data.time).getHours()}:00`}
                        </h5>
                        <img src={clear} alt="weather" style={{ width: "40px", height: "40px" }} />
                        <p>{`${Math.round(data.temp_c)}°С`}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CurrentData;