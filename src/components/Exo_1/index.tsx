import { ChangeEvent, useEffect, useState } from "react";

const Ex = () => {
  class Office {
    name: string;
    Nplug: number;
    plug: number;
    Tplug: number;
    chairs: number;
    tables: number;
    people: number;

    constructor(
      name: string,
      Nplug: number,
      plug: number,
      Tplug: number,
      chairs: number,
      tables: number,
      people: number
    ) {
      this.name = name;
      this.Nplug = Nplug;
      this.plug = plug;
      this.Tplug = Tplug;
      this.chairs = chairs;
      this.tables = tables;
      this.people = people;
    }

    addPeople(n: number): void {
      this.people += n;
    }

    display(): any {
      return this;
    }

    tauxespacedispo(): number {
      return (
        this.Nplug -
        this.people +
        (this.plug - this.people) +
        (this.Tplug - this.people) +
        (this.chairs - this.people) +
        (this.tables - this.people)
      );
    }
  }
  class CommercialOffice extends Office {
    tauxespacedispo(): number {
      return (
        this.Nplug -
        this.people +
        (this.plug - this.people) +
        (this.Tplug - this.people * 2) +
        (this.chairs - this.people * 2) +
        (this.tables - this.people)
      );
    }
  }
  class DevOffice extends Office {
    tauxespacedispo(): number {
      return (
        this.Nplug -
        this.people * 3 +
        (this.plug - this.people * 3) +
        (this.Tplug - this.people) +
        (this.chairs - this.people * 1.5) +
        (this.tables - this.people)
      );
    }
  }
  class Company {
    devOffices: Office[];
    commercialOffices: Office[];

    constructor(devOffices: Office[], commercialOffices: Office[]) {
      this.devOffices = devOffices;
      this.commercialOffices = commercialOffices;
    }

    getOffices() {
      return [...this.devOffices, ...this.commercialOffices];
    }

    full() {
      return this.getOffices().every((office) => office.tauxespacedispo() <= 0);
    }

    tauxespacedispo(): number {
      let total = 0;
      this.getOffices().forEach(
        (office) => (total += office.tauxespacedispo())
      );
      return total;
    }

    addOffice(office: typeof Office): void {
      if (office instanceof DevOffice) {
        this.devOffices.push(office);
      } else if (office instanceof CommercialOffice) {
        this.commercialOffices.push(office);
      } else {
        console.log("Specify type of office");
      }
    }

    addPeople(office: Office, people: number): void {
      if (office.tauxespacedispo() > 0) {
        office.addPeople(people);
      } else {
        console.log("Too many people in this office : " + office.name);
      }
    }

    log() {
      let dev = 0;
      this.devOffices.map((office) => (dev += office.people));
      let comm = 0;
      this.commercialOffices.map((office) => (comm += office.people));

      console.log("Total dev : " + dev);
      console.log("Total comm : " + comm);
      this.getOffices().forEach((office) =>
        console.log(
          office.name + " : taux espace dispo " + office.tauxespacedispo()
        )
      );
    }
  }

  const [Comp, setComp] = useState<Company>();

  const Commercial1 = new CommercialOffice("Comm 1", 20, 20, 40, 40, 20, 0);
  const Commercial2 = new CommercialOffice("Comm 2", 10, 10, 10, 10, 10, 0);
  const Commercial3 = new CommercialOffice("Comm 3", 2, 2, 4, 4, 2, 2);
  const Dev1 = new DevOffice("Dev 1", 50, 50, 50, 50, 50, 0);
  const Dev2 = new DevOffice("Dev 2", 6, 6, 2, 3, 2, 0);

  const TestCompany = new Company(
    [Dev1, Dev2],
    [Commercial1, Commercial2, Commercial3]
  );

  const getRandomInt = (max: number) => {
    const min: number = 0;
    return Math.floor(Math.random() * (max - min) + min);
  };

  const loop = () => {
    while (!TestCompany.full()) {
      TestCompany.addPeople(
        TestCompany.getOffices()[getRandomInt(5)],
        getRandomInt(5)
      );
      TestCompany.log();
    }
    setComp(TestCompany);
  };

  useEffect(() => {
    setComp(TestCompany);
  }, []);

  return (
    <section>
      <h1 className="my-5">Company & Offices</h1>
      <button onClick={() => loop()} className="mt-5 mb-8">
        Hire random people til full (random / max 5)
      </button>
      <div>
        <p className="bold">Global free space : {Comp?.tauxespacedispo()}</p>
        <p className="text-sm">
          (free space actually calculates quantity of unused stuff)
        </p>
        <hr className="my-5" />
        {Comp &&
          Comp.getOffices().map((o, index) => (
            <>
              <div key={index}>
                <h2 className="bold mb-3">{o.name} : </h2>
                <h3>
                  Free space :{" "}
                  <span className="bold">{o.tauxespacedispo()}</span>
                </h3>
                <p className="mb-2"></p>
                {Object.keys(o.display()).map((key, index) => {
                  if (key !== "name") {
                    return (
                      <p
                        key={index}
                        className={key === "people" ? "mt-3 bold" : ""}
                      >
                        {key}: {o.display()[key]}
                      </p>
                    );
                  }
                })}
              </div>
              <hr className="my-8" />
            </>
          ))}
      </div>
    </section>
  );
};

export default Ex;
