import Handbrake from 'handbrake-js';
import formidable from 'formidable';
import fs from 'fs';
import { NextResponse } from 'next/server';

// Function to convert video
const convertVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    Handbrake.spawn({ input: inputPath, output: outputPath, preset: 'Web' })
      .on('error', (err) => reject(err))
      .on('end', () => resolve(outputPath));
  });
};

// POST method to handle video conversion
export async function POST(request) {
  try {
    if (!request) {
      return NextResponse.json({ error: 'Request is missing' }, { status: 400 });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = './uploads';
    form.keepExtensions = true;

    return new Promise((resolve, reject) => {
      form.parse(request, async (err, fields, files) => {
        if (err) {
          resolve(NextResponse.json({ error: 'Error parsing file' }, { status: 500 }));
          return;
        }

        if (!files.file) {
          resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
          return;
        }

        const inputPath = files.file.path;
        const outputPath = `${form.uploadDir}/${files.file.name}.webm`;

        try {
          await convertVideo(inputPath, outputPath);
          resolve(NextResponse.json({ success: true, outputPath }, { status: 200 }));
        } catch (error) {
          resolve(NextResponse.json({ error: 'Error converting video' }, { status: 500 }));
        } finally {
          fs.unlink(inputPath, (err) => {
            if (err) console.error('Error removing input file:', err);
          });
        }
      });
    });
  } catch (error) {
    return NextResponse.json({ error: `Unexpected error: ${error.message}` }, { status: 500 });
  }
}

// Handle other HTTP methods
export async function handler(req, res) {
  if (req.method === 'POST') {
    return POST(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}