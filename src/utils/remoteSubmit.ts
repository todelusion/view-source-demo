export const remoteSubmit = async (
  mainUriID: number | string,
  formRef: React.RefObject<HTMLFormElement>,
  formdata: FormData
) => {
  const baseuri = process.env.NEXT_PUBLIC_WPGRAPH_URI;

  if (!baseuri) {
    alert("警告！沒有設定 WPGRAPH_URI");
    return;
  }

  // 正式站
  await fetch(
    `${baseuri}/wp-json/contact-form-7/v1/contact-forms/${mainUriID}/feedback`,
    {
      method: "POST",
      body: formdata,
    }
  )
    .then((res) => {
      return res.json().then((data) => {
        if (!res.ok) {
          // 當狀態碼不在 200-299 範圍內時，拋出錯誤
          throw new Error(JSON.stringify(data));
        }
        alert("成功寄出");
        formRef.current?.reset();
        return data;
      });
    })
    .catch((err) => {
      alert("寄送失敗，請聯絡網站管理員");
      console.error(err);
    });
};
