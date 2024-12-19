// encrypt_secret.js
const sodium = require("libsodium-wrappers");

async function encryptSecret(publicKeyBase64, secretValue) {
  await sodium.ready;

  const publicKey = sodium.from_base64(publicKeyBase64, sodium.base64_variants.ORIGINAL);
  const encryptedValue = sodium.crypto_box_seal(secretValue, publicKey);

  return sodium.to_base64(encryptedValue, sodium.base64_variants.ORIGINAL);
}

if (require.main === module) {
  const [,, publicKey, secretValue] = process.argv;

  if (!publicKey || !secretValue) {
    console.error("Usage: node encrypt_secret.js <publicKeyBase64> <secretValue>");
    process.exit(1);
  }

  encryptSecret(publicKey, secretValue)
    .then(encryptedValue => {
      console.log(encryptedValue);
    })
    .catch(error => {
      console.error("Error encrypting secret:", error);
      process.exit(1);
    });
}
