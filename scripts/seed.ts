import { db } from "@/db/drizzle";
import { districtsTable, locationsTable, regionsTable } from "@/db/schema";

async function seedLocations() {
  // seed 4 regions
  const central = await db
    .insert(regionsTable)
    .values({ name: "Central" })
    .returning();
  const eastern = await db
    .insert(regionsTable)
    .values({ name: "Eastern" })
    .returning();
  const northern = await db
    .insert(regionsTable)
    .values({ name: "Northern" })
    .returning();
  const western = await db
    .insert(regionsTable)
    .values({ name: "Western" })
    .returning();

  // Key districts (real estate focused)

  const kampala = await db
    .insert(districtsTable)
    .values({ name: "Kampala", regionId: central[0].id })
    .returning();
  const wakiso = await db
    .insert(districtsTable)
    .values({ name: "Wakiso", regionId: central[0].id })
    .returning();
  const mukono = await db
    .insert(districtsTable)
    .values({ name: "Mukono", regionId: eastern[0].id })
    .returning();
  const jinja = await db
    .insert(districtsTable)
    .values({ name: "Jinja", regionId: eastern[0].id })
    .returning();
  const gulu = await db
    .insert(districtsTable)
    .values({ name: "Gulu", regionId: northern[0].id })
    .returning();
  const mbarara = await db
    .insert(districtsTable)
    .values({ name: "Mbarara", regionId: western[0].id })
    .returning();

  // Premium locations
  await db.insert(locationsTable).values([
    // Kampala District
    { name: "Kampala Central", districtId: kampala[0].id },
    { name: "Kololo", districtId: kampala[0].id },
    { name: "Nakasero", districtId: kampala[0].id },
    { name: "Naguru", districtId: kampala[0].id },
    { name: "Muyenga", districtId: kampala[0].id },
    { name: "Bukoto", districtId: kampala[0].id },
    { name: "Ntinda", districtId: kampala[0].id },
    { name: "Munyonyo", districtId: kampala[0].id },
    { name: "Buziga", districtId: kampala[0].id },

    // Wakiso District
    { name: "Entebbe", districtId: wakiso[0].id },
    { name: "Namugongo", districtId: wakiso[0].id },
    { name: "Kira", districtId: wakiso[0].id },
    { name: "Gayaza", districtId: wakiso[0].id },

    // Mukono District
    { name: "Seeta", districtId: mukono[0].id },
    { name: "Lugazi", districtId: mukono[0].id },

    // Other regions (major towns)
    { name: "Jinja Town", districtId: jinja[0].id },
    { name: "Gulu City", districtId: gulu[0].id },
    { name: "Mbarara City", districtId: mbarara[0].id },
  ]);
    
    console.log("Hierarchical locations seeded");
    process.exit(0);
}

seedLocations();
