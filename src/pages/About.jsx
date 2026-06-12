import "../styles/about.css";

export default function About() {
  return (
    <article>
      <h1>about me.</h1>
      <img
        id="about-me-img"
        src={`${import.meta.env.BASE_URL}img/essie.jpeg`}
        alt="photo of essie drinking tea at a table with cards"
        width="160"
        height="160"
      />
      <p>
        I'm a developer with the career history of someone who took the scenic
        route. I came to software through finance — an unusual path, but one I
        wouldn't trade.
      </p>
      <p>
        I'm based in Boston, currently building enterprise logistics solutions
        at Centiro and working toward my CIS master's degree at Boston
        University.
      </p>

      <section className="about-section">
        <p>
          These days I work mostly in C# and .NET within a microservices
          architecture. The finance background turns out to be surprisingly
          useful — I learned how to make sense of messy systems and translate
          what business people actually need into something technical teams can
          build. I like problems where you have to understand both sides to
          solve anything.
        </p>
      </section>

      <section className="about-section">
        <p>
          When I'm not at a keyboard you'll find me idling at a cafe, picking up
          yet <i>another</i> book at a bookshop, or deep in a cozy corner with a
          cup of tea and my steamdeck.
        </p>
      </section>

      <section className="about-section">
        <p className="section-label">currently working with</p>
        <ul className="tag-list">
          <li>C# / .NET</li>
          <li>Azure</li>
          <li>Docker</li>
          <li>MSSQL</li>
          <li>MongoDB</li>
          <li>Git</li>
        </ul>
        <p className="section-label">currently learning</p>
        <ul className="tag-list">
          <li>JavaScript</li>
          <li>React</li>
          <li>Python</li>
          <li>Java</li>
        </ul>
      </section>
    </article>
  );
}
