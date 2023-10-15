const Title = () => {
  const styles = getStyles();
  return <h1 className={styles.title}>PEOPLE AND THEIR CARS</h1>;
};

const getStyles = () => ({
  title: {
    fontSize: 50,
    textAlign: "center",
    color: "#fff",
    margin: "1rem 0",
  },
});

export default Title;
