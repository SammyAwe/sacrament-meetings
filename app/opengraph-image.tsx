
import { ImageResponse } from 'next/og';

export const alt = 'Sacrament Meeting Planner for Lagos Mainland Ward';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#102a56',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: '#bfdbfe',
            letterSpacing: 5,
            marginBottom: 30,
          }}
        >
          LAGOS MAINLAND WARD
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          Sacrament Meeting Planner
        </div>

        <div
          style={{
            fontSize: 28,
            color: '#dbeafe',
            marginTop: 30,
          }}
        >
          Plan. Organize. Share.
        </div>

        <div
          style={{
            width: 120,
            height: 8,
            background: '#60a5fa',
            marginTop: 45,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
