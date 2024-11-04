const getAnchorId = (pathname: string) => {
  return pathname.split("#")[1];
};

export default getAnchorId;
