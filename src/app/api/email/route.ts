import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  console.log(data.getAll("files"));
  const files: File[] | null = data.getAll("files") as unknown as File[];
  const name: string = data.get("name") as string;
  const email: string = data.get("email") as string;

  // console.log(files);

  if (!files) {
    return NextResponse.json({ success: false });
  }
  const arr: Mail.Attachment[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    arr.push({
      filename: file.name,
      content: buffer,
    });
  }
  console.log(data);
  console.log(name, email);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Application from ${name} (${email})`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${data.get("phone")}
      Job: ${data.get("job")}
      Arbeitsort: ${data.get("arbeitsort")}
    `,
    attachments: arr,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
