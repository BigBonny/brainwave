import CompactLanding from "./components/Compact";

const App = () => {
  return (
    
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background: `
          linear-gradient(
            to bottom,
            #0C190F 0%,    /* deep forest green */
            #0C190F 25%,   /* stay green at top */
            #2A1A12 40%,   /* earth brown */
            #6B1F10 55%,   /* warm crimson */
            #8A0F1A 75%,   /* vivid red */
            #050103 100%   /* deep heart black */
          )
        `,
      }}
    >
      <main className="pt-[0]">
        
        <CompactLanding />
      </main>
    </div>
  );
};

export default App;
