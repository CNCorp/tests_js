import { useEffect, useState } from "react";
import Article from "./article.txt";

// on utilise lodash pour exclure ponctuation + whitespaces et ne garder que les mots, bien plus simple qu'une regexp ou multiplier des splits
import _ from "lodash";

const Ex = () => {
  const [Text, setText] = useState<string[] | undefined>();

  useEffect(() => {
    fetch(Article)
      .then((r) => r.text())
      .then((t) => {
        // lodash
        let arr: string[] = _.words(t);
        console.log(arr);
        setText(arr);
      });
  }, []);
  return (
    <section>
      <h1 className="mb-8">Exo 3</h1>

      <p className="mb-8"> Words count : {Text?.length}</p>

      <ul className="list-decimal text-left">
        {Text?.map((w, i) => (
          <li key={i}> &nbsp;&nbsp;{w}</li>
        ))}
      </ul>
    </section>
  );
};

export default Ex;
