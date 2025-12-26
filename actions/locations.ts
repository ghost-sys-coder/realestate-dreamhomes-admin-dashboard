"use server";

import { db } from "@/db/drizzle";
import { districtsTable, locationsTable, regionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// fetch regions
export async function getRegions() {
  try {
    const regions = await db
      .select({
        id: regionsTable.id,
        name: regionsTable.name,
      })
      .from(regionsTable);
    return regions;
  } catch {
    return [];
  }
}

// fetch districts
export async function getDistricts() {
  try {
    const districts = await db
      .select({
        id: districtsTable.id,
        name: districtsTable.name,
        regionId: districtsTable.regionId,
      })
      .from(districtsTable);
    return districts;
  } catch {
    return [];
  }
}

// fetch locations
export async function getLocations() {
  try {
    const locations = await db
      .select({
        id: locationsTable.id,
        name: locationsTable.name,
        districtId: locationsTable.districtId,
      })
      .from(locationsTable);
    return locations;
  } catch {
    return [];
  }
}

// add region
export async function addRegion(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) {
    return { success: false, message: "Region name is required" };
  }

  try {
    await db.insert(regionsTable).values({ name: name.trim() });
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "Region added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add region",
    };
  }
}

// add district
export async function addDistrict(formData: FormData) {
  const name = formData.get("name") as string;
  const regionId = formData.get("regionId") as string;

  if (!name || !regionId) {
    return { success: false, message: "District name and region are required" };
  }

  try {
    await db.insert(districtsTable).values({ name: name.trim(), regionId });
    revalidatePath("/dashboard/settings");

    return { success: false, message: "District added successfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add district",
    };
  }
}

// add cities // neighbourhoods
export async function addLocation(formData: FormData) {
  const location = formData.get("location") as string;
  const districtId = formData.get("districtId") as string;

  if (!location || !districtId) {
    return {
      success: false,
      message: "Location name and district are required",
    };
  }

  try {
    await db
      .insert(locationsTable)
      .values({ name: location.trim(), districtId });
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "Location added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add location",
    };
  }
}

// delete server functions
export async function deleteRegion(id: string) {
  try {
    await db.delete(regionsTable).where(eq(regionsTable.id, id));
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "Region deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete region",
    };
  }
}

// delete district
export async function deleteDistrict(id: string) {
  try {
    await db.delete(districtsTable).where(eq(districtsTable.id, id));
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "District deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete district",
    };
  }
}

// delete function
export async function deleteLocation(id: string) {
  try {
    await db.delete(locationsTable).where(eq(locationsTable.id, id));
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "Location deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete location",
    };
  }
}

// updated region

export async function updateRegion(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  if (!id || !name) {
    return {
      success: false,
      message: "Region name and id are required",
    };
  }

  try {
    await db
      .update(regionsTable)
      .set({ name: name.trim() })
      .where(eq(regionsTable.id, id));
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "Region updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update region",
    };
  }
}

// update district
export async function updateDistrict(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const regionId = formData.get("regionId") as string;

  if (!id || !name || !regionId) {
    return {
      success: false,
      message: "District name, id and region id are required",
    };
  }

  try {
    await db
      .update(districtsTable)
      .set({ name: name.trim(), regionId: regionId })
      .where(eq(districtsTable.id, id));
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "District updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update district",
    };
  }
}

// update location
export async function updateLocation(formData: FormData) {
  const id = formData.get("id") as string;
  const districtId = formData.get("districtId") as string;
  const name = formData.get("name") as string;

  if (!id || !name || !districtId) {
    return {
      success: false,
      message: "Location name, id and district id are required",
    };
  }

  try {
    await db
      .update(locationsTable)
      .set({ name: name.trim(), districtId: districtId })
      .where(eq(locationsTable.id, id));
    revalidatePath("/dashboard/settings");

    return {
      success: true,
      message: "Location updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update location",
    };
  }
}
