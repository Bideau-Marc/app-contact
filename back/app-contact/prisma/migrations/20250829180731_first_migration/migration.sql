-- CreateTable
CREATE TABLE "employes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "status" TEXT
);

-- CreateTable
CREATE TABLE "contacts_employes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "est_archive" BOOLEAN NOT NULL DEFAULT false,
    "date_archivage" DATETIME,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "employe_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    CONSTRAINT "contacts_employes_employe_id_fkey" FOREIGN KEY ("employe_id") REFERENCES "employes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contacts_employes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "employes_email_key" ON "employes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_employes_employe_id_contact_id_key" ON "contacts_employes"("employe_id", "contact_id");
