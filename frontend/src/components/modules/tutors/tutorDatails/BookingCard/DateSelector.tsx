interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {getAvailableDates().map((date, index) => {
        const dateStr = date.toLocaleDateString("en-CA")
        const isSelected = selectedDate === dateStr;

        return (
          <button
            key={index}
            onClick={() => onSelectDate(dateStr)}
          className={`p-3 rounded-xl border-2 text-sm font-medium ${
                  isSelected
                    ? "text-white"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: "var(--color-custom-primary)" }
                    : {}
                }  >
            {formatDate(date)}
          </button>
        );
      })}
    </div>
  );
}
