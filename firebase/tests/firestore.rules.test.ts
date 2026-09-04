import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";

let testEnv: RulesTestEnvironment | undefined;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "habit-log-test",
    firestore: {
      rules: readFileSync("firebase/firestore.rules", "utf8")
    }
  });
});

afterAll(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  await requireTestEnv().clearFirestore();
});

function requireTestEnv() {
  if (!testEnv) {
    throw new Error("Firestore rules test environment was not initialized.");
  }

  return testEnv;
}

function dbFor(uid: string, email: string) {
  return requireTestEnv()
    .authenticatedContext(uid, { email })
    .firestore();
}

function anonymousDb() {
  return requireTestEnv().unauthenticatedContext().firestore();
}

describe("Firestore security rules", () => {
  it("blocks anonymous reads", async () => {
    await assertFails(getDoc(doc(anonymousDb(), "habitStatuses/2026-09-04")));
  });

  it("allows authenticated viewers to read habit statuses", async () => {
    await requireTestEnv().withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "green",
        updatedBy: "owner",
        updatedAt: new Date()
      });
    });

    await assertSucceeds(
      getDoc(doc(dbFor("viewer", "viewer@example.com"), "habitStatuses/2026-09-04"))
    );
  });

  it("blocks viewer writes", async () => {
    await assertFails(
      setDoc(doc(dbFor("viewer", "viewer@example.com"), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "green",
        updatedBy: "viewer",
        updatedAt: new Date()
      })
    );
  });

  it("blocks viewer updates to existing habit statuses", async () => {
    await requireTestEnv().withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "red",
        updatedBy: "owner",
        updatedAt: new Date()
      });
    });

    await assertFails(
      updateDoc(doc(dbFor("viewer", "viewer@example.com"), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "green",
        updatedBy: "viewer",
        updatedAt: new Date()
      })
    );
  });

  it("blocks viewer deletes to existing habit statuses", async () => {
    await requireTestEnv().withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "green",
        updatedBy: "owner",
        updatedAt: new Date()
      });
    });

    await assertFails(
      deleteDoc(doc(dbFor("viewer", "viewer@example.com"), "habitStatuses/2026-09-04"))
    );
  });

  it("allows owner writes with valid status values", async () => {
    await assertSucceeds(
      setDoc(doc(dbFor("owner", "hamdanshaikh11133@gmail.com"), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "red",
        updatedBy: "owner",
        updatedAt: new Date()
      })
    );

    await assertSucceeds(
      updateDoc(doc(dbFor("owner", "hamdanshaikh11133@gmail.com"), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "green",
        updatedBy: "owner",
        updatedAt: new Date()
      })
    );

    await assertSucceeds(
      deleteDoc(doc(dbFor("owner", "hamdanshaikh11133@gmail.com"), "habitStatuses/2026-09-04"))
    );
  });

  it("rejects invalid habit statuses", async () => {
    await assertFails(
      setDoc(doc(dbFor("owner", "hamdanshaikh11133@gmail.com"), "habitStatuses/2026-09-04"), {
        date: "2026-09-04",
        status: "blue",
        updatedBy: "owner",
        updatedAt: new Date()
      })
    );
  });
});
