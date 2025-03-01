'use client';

import { useState, useEffect, useCallback, memo } from 'react';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Componente de item de contagem memorizado para evitar re-renderizações desnecessárias
const CountdownItem = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white shadow-md rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2">
      <span className="text-xl md:text-2xl font-bold text-primary">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-text-light text-xs md:text-sm">{label}</span>
  </div>
));

CountdownItem.displayName = 'CountdownItem';

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Usando useCallback para evitar recriação da função a cada renderização
  const calculateTimeLeft = useCallback(() => {
    const target = targetDate.getTime();
    const now = new Date().getTime();
    const difference = target - now;
    
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }
  }, [targetDate]);

  useEffect(() => {
    // Calcular imediatamente
    calculateTimeLeft();
    
    // Configurar o intervalo
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex justify-center space-x-4 md:space-x-6">
      <CountdownItem value={timeLeft.days} label="Dias" />
      <CountdownItem value={timeLeft.hours} label="Horas" />
      <CountdownItem value={timeLeft.minutes} label="Minutos" />
      <CountdownItem value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

export default memo(Countdown);
