/**
 * Soudio Platform — Database Seed
 * Creates a demo user with sample subscription and images for development
 */
import { PrismaClient, PlanType, SubscriptionStatus, TransactionType, TransactionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create demo user
  const passwordHash = await bcrypt.hash("soudio123", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@soudio.sa" },
    update: {},
    create: {
      firstName: "محمد",
      lastName: "الأحمد",
      email: "demo@soudio.sa",
      phone: "+966500000000",
      passwordHash,
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Create subscription
  const subscription = await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      planType: PlanType.GROWTH,
      imagesLimit: 30,
      imagesUsed: 12,
      extraCredits: 10,
      status: SubscriptionStatus.ACTIVE,
      startDate: new Date("2025-10-10"),
      endDate: new Date("2025-11-10"),
    },
  });

  console.log(`✅ Created subscription: ${subscription.planType}`);

  // Create sample transaction
  await prisma.transaction.upsert({
    where: { referenceNumber: "2025000001" },
    update: {},
    create: {
      subscriptionId: subscription.id,
      referenceNumber: "2025000001",
      type: TransactionType.SUBSCRIPTION,
      amount: 115,
      currency: "SAR",
      status: TransactionStatus.COMPLETED,
      description: "باقة النمو - شهري",
      endDate: new Date("2026-10-10"),
    },
  });

  // Create placeholder images for the library
  const studioPatterns = [
    { studioId: "saud", patternName: "ناعم" },
    { studioId: "saud", patternName: "كلاسيك" },
    { studioId: "noor", patternName: "شهي" },
    { studioId: "noor", patternName: "دافئ" },
    { studioId: "faisal", patternName: "إزالة خلفية" },
    { studioId: "khaled", patternName: "أصالة" },
    { studioId: "waleed", patternName: "إبداعي" },
    { studioId: "shahad", patternName: "دمج مشهد" },
  ];

  for (let i = 0; i < studioPatterns.length; i++) {
    const { studioId, patternName } = studioPatterns[i];
    await prisma.generatedImage.create({
      data: {
        userId: user.id,
        studioId,
        patternName,
        imageUrl: `https://placeholder.soudio.sa/images/sample-${i + 1}.jpg`,
        thumbnailUrl: `https://placeholder.soudio.sa/images/sample-${i + 1}-thumb.jpg`,
        aspectRatio: ["1:1", "9:16", "16:9"][i % 3],
        metadata: { demo: true, index: i },
      },
    });
  }

  console.log("✅ Created 8 sample images");
  console.log("\n🎉 Seed completed!");
  console.log("📧 Demo login: demo@soudio.sa");
  console.log("🔑 Demo password: soudio123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
