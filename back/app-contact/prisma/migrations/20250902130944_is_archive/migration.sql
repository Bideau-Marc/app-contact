/*
  Warnings:

  - You are about to drop the column `est_archive` on the `contacts_employes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contacts_employes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "date_archivage" DATETIME,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "employe_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    CONSTRAINT "contacts_employes_employe_id_fkey" FOREIGN KEY ("employe_id") REFERENCES "employes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contacts_employes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contacts_employes" ("contact_id", "date_archivage", "date_creation", "employe_id", "id", "notes") SELECT "contact_id", "date_archivage", "date_creation", "employe_id", "id", "notes" FROM "contacts_employes";
DROP TABLE "contacts_employes";
ALTER TABLE "new_contacts_employes" RENAME TO "contacts_employes";
CREATE UNIQUE INDEX "contacts_employes_employe_id_contact_id_key" ON "contacts_employes"("employe_id", "contact_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
