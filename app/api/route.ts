import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { IData, IRecipe } from "@/common/types";
var nodemailer = require('nodemailer');

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

  const body = await request.json() as IRecipe;

  // Force recipe to be invisible
  body.visible = false;

  if (!process.env.AUTH_KEY) {
    return new Response('No auth configured', {
      status: 500,
    });
  }

  // Create the data object with the body and auth key, and current date
  const data : IData = {
    recipe: body,
    auth: process.env.AUTH_KEY,
    date: new Date(),
  };

  // Encode the data to urlencoded form
  const dataUrlEncoded = encodeURIComponent(JSON.stringify(data));

  // Create the endpoint endpoint, localhost if local, or bar.stjarnholm.com if production
  var endpoint = process.env.NODE_ENV === 'production' ? 'https://bar.stjarnholm.com' : 'http://localhost:3000';
  
  // Add the urlencoded encoded data to the endpoint
  endpoint += '?data=' + dataUrlEncoded;

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Also set name
  var mailOptions = {
    from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,

    subject: 'bar. | Nytt recept',
    html: `Ett nytt receptförslag har kommit till bar.: ${body.name ?? "Inget namn angivet"}
    <br><br>
    <a href="${endpoint}">Klicka här för att granska receptet.</a>
    <br><br>
    Med vänliga hälsningar,<br>
    bar.`,
    text: `Ett nytt receptförslag har kommit till bar.: ${body.name ?? "Inget namn angivet"}

    Klicka här för att granska receptet: ${endpoint}

    Med vänliga hälsningar,
    bar.`
  };

  transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
    if (error) {
      console.log(error);
      return new Response('Error', {
        status: 500,
      });
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


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

  const body = await request.json() as IRecipe;

  body.visible = true;

  const recipe = await db.collection("recipes").insertOne(body);

  return new Response('OK', {
    status: 200,
  });
}
