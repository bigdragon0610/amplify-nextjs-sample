import { Sha256 } from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";

const credentialsProvider = defaultProvider();

export default async function Home() {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL is not defined");
  }

  const url = new URL(apiUrl);
  const signer = new SignatureV4({
    credentials: credentialsProvider,
    region: "ap-northeast-1",
    service: "lambda",
    sha256: Sha256,
  });
  const signedRequest = await signer.sign({
    method: "GET",
    protocol: url.protocol,
    hostname: url.hostname,
    path: url.pathname,
    headers: {
      host: url.host,
    },
  });
  const res = await fetch(url, {
    cache: "no-store",
    headers: signedRequest.headers,
  });
  const text = await res.text();

  return <div>{text}</div>;
}
