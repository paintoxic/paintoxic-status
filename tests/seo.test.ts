import { describe, expect, it } from "vitest";
import { pageTitle, personJsonLd } from "../src/lib/seo.ts";

describe("pageTitle", () => {
  it("includes name, role and status in each language", () => {
    expect(pageTitle("es")).toBe("Paintoxic — Ingeniero DevOps & SRE · Status");
    expect(pageTitle("en")).toBe("Paintoxic — DevOps & SRE Engineer · Status");
  });
});

describe("personJsonLd", () => {
  it("describes a Person working at Yuno with profile links", () => {
    const ld = personJsonLd("en");
    expect(ld).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Paintoxic",
      jobTitle: "DevOps & SRE Engineer",
      url: "https://paintoxic.io/en/",
      worksFor: { "@type": "Organization", name: "Yuno", url: "https://www.y.uno/" },
    });
    expect(ld.sameAs).toEqual([
      "https://github.com/paintoxic",
      "https://www.linkedin.com/in/paintoxic/",
      "https://twitter.com/paintox1c",
    ]);
    expect(personJsonLd("es").jobTitle).toBe("Ingeniero DevOps & SRE");
    expect(personJsonLd("es").url).toBe("https://paintoxic.io/");
  });
});
