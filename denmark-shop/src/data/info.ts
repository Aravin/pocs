import type { Localized } from "@/lib/types";

const l = (da: string, en: string): Localized => ({ da, en });

export interface InfoSection {
  heading: Localized;
  body: Localized[];
}

export interface InfoPage {
  slug: "delivery" | "returns" | "faq" | "terms" | "privacy";
  title: Localized;
  intro: Localized;
  sections: InfoSection[];
  faqs?: { question: Localized; answer: Localized }[];
}

export const infoPages: InfoPage[] = [
  {
    slug: "delivery",
    title: l("Levering & afhentning", "Delivery & pickup"),
    intro: l(
      "Vi pakker hver ordre i hånden fra butikken på Jægersborggade. Her er alt du behøver at vide om levering, afhentning og hvornår du kan regne med at have varerne.",
      "We pack every order by hand at the shop on Jægersborggade. Here is everything you need to know about delivery, pickup and when to expect your goods.",
    ),
    sections: [
      {
        heading: l("Levering i Danmark", "Delivery in Denmark"),
        body: [
          l(
            "Vi sender med GLS og DAO til hele Danmark. Ordrer afgivet før kl. 14 på hverdage sendes samme dag, og du har normalt pakken inden for 1–3 hverdage.",
            "We ship with GLS and DAO across Denmark. Orders placed before 14:00 on weekdays are dispatched the same day, and you will normally have your parcel within 1–3 weekdays.",
          ),
          l(
            "Levering koster 49 kr. Gratis levering ved køb over 499 kr. Du får altid et sporingsnummer på mail, når pakken forlader butikken.",
            "Delivery costs 49 DKK. Free delivery on orders over 499 DKK. You will always receive a tracking number by email when the parcel leaves the shop.",
          ),
        ],
      },
      {
        heading: l("Afhentning i Nørrebro", "Click & collect in Nørrebro"),
        body: [
          l(
            "Vælg “Afhentning” i kassen, og hent din ordre i butikken på Jægersborggade 31. Vi sender en mail, så snart den er pakket — typisk inden for 2 timer i åbningstiden.",
            "Choose “Pickup” at checkout and collect your order at Jægersborggade 31. We email you as soon as it is packed — usually within 2 hours during opening hours.",
          ),
          l(
            "Åbningstider: mandag–fredag 10–19, lørdag 10–17. Søndag er der lukket. Afhentning er altid gratis.",
            "Opening hours: Monday–Friday 10–19, Saturday 10–17. Closed on Sundays. Pickup is always free.",
          ),
        ],
      },
      {
        heading: l("Levering i Europa", "Delivery in Europe"),
        body: [
          l(
            "Vi sender til hele EU med sporing. Leveringstiden er 3–7 hverdage, og fragten starter ved 79 kr. Eventuel lokal moms og told er inkluderet i prisen.",
            "We ship across the EU with tracking. Delivery takes 3–7 weekdays, with shipping from 79 DKK. Any local VAT and duties are included in the price.",
          ),
        ],
      },
      {
        heading: l("Hvis noget går galt", "If something goes wrong"),
        body: [
          l(
            "Skriv til hej@miraclehabesha.dk med dit ordrenummer, hvis pakken er forsinket eller beskadiget. Vi finder en løsning — og sender gerne erstatningsvarer med det samme.",
            "Email hej@miraclehabesha.dk with your order number if your parcel is delayed or damaged. We will find a solution — and are happy to send replacements straight away.",
          ),
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: l("Retur & bytte", "Returns & exchanges"),
    intro: l(
      "Mad skal smage, som den skal. Hvis du fortryder dit køb, tager vi imod retur i op til 14 dage — med et par undtagelser for åbnede fødevarer.",
      "Food should taste the way it should. If you change your mind, we accept returns for up to 14 days — with a few exceptions for opened food items.",
    ),
    sections: [
      {
        heading: l("14 dages returret", "14-day return policy"),
        body: [
          l(
            "Du kan returnere uåbnede varer inden for 14 dage fra modtagelse. Send en mail til hej@miraclehabesha.dk med dit ordrenummer, så sender vi en returvejledning.",
            "You can return unopened products within 14 days of receipt. Email hej@miraclehabesha.dk with your order number and we will send return instructions.",
          ),
          l(
            "Returfragten betaler du selv, medmindre varen er defekt eller ikke svarer til din ordre. Vi refunderer inden for 5–10 hverdage efter modtagelse.",
            "You pay return shipping unless the item is faulty or does not match your order. We refund within 5–10 weekdays of receiving the return.",
          ),
        ],
      },
      {
        heading: l("Åbnede fødevarer", "Opened food items"),
        body: [
          l(
            "Af hensyn til fødevaresikkerhed kan åbnede krydderier, mel, kaffe og honning ikke returneres. Har du fået en defekt eller forkert vare, dækker vi naturligvis alt.",
            "For food safety reasons, opened spices, flour, coffee and honey cannot be returned. If you received a faulty or incorrect item, we of course cover everything.",
          ),
        ],
      },
      {
        heading: l("Sådan gør du", "How to return"),
        body: [
          l(
            "1. Skriv til os med ordrenummer og årsag. 2. Pak varen forsvarligt. 3. Send til Miracle Habesha Shop, Jægersborggade 31, 2200 København N. Gem kvitteringen, indtil refunderingen er gennemført.",
            "1. Email us with your order number and reason. 2. Pack the item securely. 3. Send it to Miracle Habesha Shop, Jægersborggade 31, 2200 København N. Keep the receipt until the refund is complete.",
          ),
        ],
      },
    ],
  },
  {
    slug: "faq",
    title: l("Ofte stillede spørgsmål", "Frequently asked questions"),
    intro: l(
      "Korte svar på det, vi oftest får spørgsmål om. Kan du ikke finde svaret, er du altid velkommen til at skrive til os.",
      "Short answers to the questions we hear most often. If you cannot find what you need, you are always welcome to write to us.",
    ),
    sections: [],
    faqs: [
      {
        question: l("Hvor lang tid tager leveringen?", "How long does delivery take?"),
        answer: l(
          "I Danmark 1–3 hverdage. I resten af EU 3–7 hverdage. Afhentning i butikken er klar inden for 2 timer i åbningstiden.",
          "1–3 weekdays in Denmark. 3–7 weekdays in the rest of the EU. Click & collect is ready within 2 hours during opening hours.",
        ),
      },
      {
        question: l("Hvornår er leveringen gratis?", "When is delivery free?"),
        answer: l(
          "Ved køb over 499 kr. i Danmark. Afhentning i Nørrebro er altid gratis.",
          "On orders over 499 DKK in Denmark. Click & collect in Nørrebro is always free.",
        ),
      },
      {
        question: l("Hvordan optjener jeg point?", "How do I earn points?"),
        answer: l(
          "Du optjener 1 point pr. 10 kr. både online og i butikken. Pointene registreres via Lovely Loyalty POS og samles automatisk på din konto.",
          "You earn 1 point per 10 DKK both online and in store. Points are registered via Lovely Loyalty POS and collected automatically in your account.",
        ),
      },
      {
        question: l("Kan jeg betale i euro?", "Can I pay in euros?"),
        answer: l(
          "Priserne kan vises i DKK, EUR og SEK. Betalingen gennemføres i DKK; valutakursen er vejledende. I denne demo gennemføres ingen rigtig betaling.",
          "Prices can be displayed in DKK, EUR and SEK. Payment is processed in DKK; exchange rates are indicative. No real payment is taken in this demo.",
        ),
      },
      {
        question: l("Er der allergener i jeres krydderier?", "Do your spices contain allergens?"),
        answer: l(
          "Hver vare har en allergenangivelse på produktsiden. Krydderier kan indeholde spor af sesam og nødder, fordi de håndteres i samme lokale.",
          "Each product page lists allergens. Spices may contain traces of sesame and nuts as they are handled in the same facility.",
        ),
      },
      {
        question: l("Kan jeg bruge min medlemskonto i butikken?", "Can I use my membership in store?"),
        answer: l(
          "Ja. Vis dit medlemskort i butikken, så registrerer vi point på samme konto som i webshoppen. I demoen er data mock-data fra POS-integrationen.",
          "Yes. Show your member card in store and we register points on the same account as the webshop. In this demo, data is mocked from the POS integration.",
        ),
      },
    ],
  },
  {
    slug: "terms",
    title: l("Handelsbetingelser", "Terms of sale"),
    intro: l(
      "Disse betingelser gælder for køb i Miracle Habesha Shops webshop. Butikken er en demo, og ingen rigtig betaling gennemføres.",
      "These terms apply to purchases in the Miracle Habesha Shop webshop. The shop is a demo and no real payment is taken.",
    ),
    sections: [
      {
        heading: l("Priser & betaling", "Prices & payment"),
        body: [
          l(
            "Alle priser er angivet i danske kroner inkl. moms. Valutavisning i EUR og SEK er vejledende. Betaling sker med MobilePay eller kort; i demoen gemmes ingen betalingsoplysninger.",
            "All prices are shown in Danish kroner including VAT. Display in EUR and SEK is indicative. Payment is by MobilePay or card; no payment details are stored in the demo.",
          ),
        ],
      },
      {
        heading: l("Ordrebekræftelse", "Order confirmation"),
        body: [
          l(
            "Når du gennemfører en ordre, modtager du en bekræftelse i denne browser. Ordren er først bindende, når vi har bekræftet den på mail.",
            "When you complete an order, you receive a confirmation in this browser. The order is only binding once we have confirmed it by email.",
          ),
        ],
      },
      {
        heading: l("Fortrydelse", "Right of withdrawal"),
        body: [
          l(
            "Du har 14 dages fortrydelsesret på uåbnede varer. Se returpolitikken for undtagelser for åbnede fødevarer.",
            "You have a 14-day right of withdrawal on unopened products. See the returns policy for exceptions on opened food items.",
          ),
        ],
      },
      {
        heading: l("Ansvar", "Liability"),
        body: [
          l(
            "Vi gør os umage med at beskrive varerne korrekt. Er der alligevel en fejl, retter vi den eller refunderer købet efter aftale.",
            "We take care to describe products accurately. If there is still an error, we will correct it or refund the purchase by agreement.",
          ),
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: l("Privatlivspolitik", "Privacy policy"),
    intro: l(
      "Vi indsamler kun de oplysninger, der er nødvendige for at pakke og levere din ordre — og for at vise dine point. Demoen gemmer data lokalt i din browser.",
      "We only collect the information needed to pack and deliver your order — and to show your points. The demo stores data locally in your browser.",
    ),
    sections: [
      {
        heading: l("Hvilke data?", "What data?"),
        body: [
          l(
            "Navn, adresse, mail og telefonnummer, når du gennemfører en ordre. Medlemsdata som point og købshistorik kommer fra Lovely Loyalty POS.",
            "Name, address, email and phone number when you complete an order. Member data such as points and purchase history comes from Lovely Loyalty POS.",
          ),
        ],
      },
      {
        heading: l("Opbevaring", "Retention"),
        body: [
          l(
            "I demoen gemmes ordrer og point i browserens localStorage. De forsvinder, hvis du rydder browserdata. I en rigtig butik ville data blive opbevaret efter bogføringsloven.",
            "In the demo, orders and points are stored in your browser's localStorage. They disappear if you clear browser data. In a real shop, data would be retained in line with bookkeeping law.",
          ),
        ],
      },
      {
        heading: l("Dine rettigheder", "Your rights"),
        body: [
          l(
            "Du kan til enhver tid få indsigt i, rettet eller slettet dine oplysninger ved at skrive til hej@miraclehabesha.dk.",
            "You can request access to, correction of or deletion of your information at any time by emailing hej@miraclehabesha.dk.",
          ),
        ],
      },
      {
        heading: l("Cookies", "Cookies"),
        body: [
          l(
            "Vi bruger kun nødvendige cookies og lokal lagring til kurv, valuta og sprog. Ingen tracking eller annoncering i demoen.",
            "We only use necessary cookies and local storage for cart, currency and language. No tracking or advertising in the demo.",
          ),
        ],
      },
    ],
  },
];

export const infoBySlug = (slug: string) =>
  infoPages.find((page) => page.slug === slug);
