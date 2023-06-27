import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// GET: Fetch all recipes
export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db();

  // Filter out the recipes that are not visible
  const recipes = await db
    .collection("recipes")
    .find({ visible: true })
    .toArray();

  return new Response(JSON.stringify(recipes), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}

// POST: Send a new recipe to the admin email
export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();

  const body = await request.json();

  // TODO SEND EMAIL TO ADMIN

  return new Response('OK', {
    status: 200,
  });
}

// PUT: Save a recipe
export async function PUT(request: Request) {
  const client = await clientPromise;
  const db = client.db();

  const params = new URL(request.url).searchParams;

  // Check if the required auth query string is present
  const auth = params.get("auth");

  if (auth !== process.env.AUTH_KEY) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const body = await request.json();

  const recipe = await db.collection("recipes").insertOne(body);

  return new Response('OK', {
    status: 200,
  });
}
