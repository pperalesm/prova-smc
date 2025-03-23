export async function WeatherInfo({ location }: { location: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      <div className="flex items-center justify-center w-40 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-40 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
      <div className="flex items-center justify-center w-25 h-40 border-b">
        {location}
      </div>
    </>
  );
}
