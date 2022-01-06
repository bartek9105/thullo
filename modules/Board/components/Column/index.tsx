export type ColumnProps<T> = {
  title: string;
  cardData: T[];
  renderCard: (data: T) => JSX.Element;
};

const Column = <T extends {}>({
  title,
  cardData,
  renderCard,
}: ColumnProps<T>) => {
  console.log("cardData", cardData);

  return (
    <>
      <h1>{title}</h1>
      <ul>
        {cardData.map((slide: T, index) => (
          <li key={index}>{renderCard(slide)}</li>
        ))}
      </ul>
    </>
  );
};

export default Column;
