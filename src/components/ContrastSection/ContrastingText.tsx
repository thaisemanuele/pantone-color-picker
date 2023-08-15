const ContrastingText = () => {
  const goodForTitles = "This is a good color for a large text";
  const badForTitles = "This is a bad color for a large text";
  return (
    <div className="contrast-text">
      <h2>{goodForTitles}</h2>
      <p>This is a good color for small text contrast</p>

      <p>
        Good color contrast ensures that your text stands out and is easily
        distinguishable from its background. This means your words become clear
        and crisp, making your content accessible to everyone, including those
        with visual impairments or who might be viewing your content on
        different devices
      </p>
      <span className="bad-contrast">
        Imagine trying to read text that blends into the background or strains
        your eyes
      </span>
    </div>
  );
};

export default ContrastingText;
