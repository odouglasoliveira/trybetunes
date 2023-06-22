const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const { results } = await request.json();
  return results;
};

export default getMusics;
