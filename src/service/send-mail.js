import getURL from "~/helper/helper";

const sendReport = async (email, subject, contentUrl) => {
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        from: "Arc Team <arcbykaos@gmail.com>",
        subject,
        text: `
          Please visit the link to go to the report:

          ${contentUrl}

          Regards,
          Arc Team
        `,
      }),
    };

    const url = getURL(`/api/send-mail`);
    const resp = await fetch(url, config);
    const respJson = await resp.json();
    return respJson;
  } catch (error) {
    return null;
  }
};

export default sendReport;
