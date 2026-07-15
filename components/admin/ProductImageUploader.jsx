"use client";

import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

// Ngarkon foto nga galeria/kompjuteri direkt në Cloudinary.
// Pas upload-it, URL-ja e sigurt vendoset automatikisht te forma e produktit.
export default function ProductImageUploader({
  imageUrl,
  onUploaded,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Lexon përgjigjen e API-së në mënyrë të sigurt.
  // Nëse serveri kthen HTML në vend të JSON, jep një mesazh të kuptueshëm.
  async function readJsonResponse(response, sourceName) {
    const responseText = await response.text();
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      console.error(`${sourceName} ktheu përgjigje jo-JSON:`, responseText);

      throw new Error(
        `${sourceName} nuk ktheu JSON. Statusi: ${response.status}. ` +
          "Kontrollo që endpoint-i ekziston dhe që je futur si admin."
      );
    }

    try {
      return JSON.parse(responseText);
    } catch {
      console.error(`${sourceName} JSON i pavlefshëm:`, responseText);

      throw new Error(
        `${sourceName} ktheu JSON të pavlefshëm. Statusi: ${response.status}.`
      );
    }
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    // Lejon zgjedhjen e të njëjtit file përsëri.
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Zgjidh vetëm një file fotografie.");
      return;
    }

    // Limit maksimal 8 MB.
    if (file.size > 8 * 1024 * 1024) {
      setError("Fotoja duhet të jetë më e vogël se 8 MB.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // 1. Kërkon signature nga backend-i ynë.
      const signResponse = await fetch("/api/uploads/sign", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });

      const signData = await readJsonResponse(
        signResponse,
        "API e signature"
      );

      if (!signResponse.ok) {
        throw new Error(
          signData.message ||
            `Nuk u krijua signature. Statusi: ${signResponse.status}`
        );
      }

      if (
        !signData.cloudName ||
        !signData.apiKey ||
        !signData.timestamp ||
        !signData.signature ||
        !signData.folder
      ) {
        throw new Error(
          "API e signature nuk ktheu të gjitha të dhënat e nevojshme."
        );
      }

      // 2. Përgatit file-in dhe parametrat për Cloudinary.
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      // 3. Ngarkon foton direkt në Cloudinary.
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await readJsonResponse(
        uploadResponse,
        "Cloudinary"
      );

      if (!uploadResponse.ok || !uploadData.secure_url) {
        throw new Error(
          uploadData.error?.message ||
            `Fotoja nuk u ngarkua. Statusi: ${uploadResponse.status}`
        );
      }

      // 4. Vendos URL-në e fotos te forma e produktit.
      onUploaded(uploadData.secure_url);
    } catch (uploadError) {
      console.error("Gabim gjatë upload-it:", uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Ndodhi një gabim gjatë upload-it."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={handleFileChange}
      />

      <Stack spacing={1.5}>
        <Button
          type="button"
          variant="outlined"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          sx={{
            color: "#111",
            borderColor: "#111",
            fontWeight: 900,
            "&:hover": {
              borderColor: "#f58220",
              bgcolor: "#fff7ef",
            },
          }}
        >
          {uploading
            ? "Po ngarkohet fotoja..."
            : "📷 Zgjidh foto nga galeria"}
        </Button>

        {uploading && <LinearProgress />}

        {imageUrl && (
          <Box
            sx={{
              bgcolor: "#fff",
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 1,
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt="Pamja paraprake e produktit"
              sx={{
                width: "100%",
                height: 180,
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ fontSize: 14 }}>
            {error}
          </Typography>
        )}

        <Typography sx={{ color: "#666", fontSize: 12 }}>
          Formatet: JPG, PNG, WEBP ose GIF. Madhësia maksimale: 8 MB.
        </Typography>
      </Stack>
    </Box>
  );
}