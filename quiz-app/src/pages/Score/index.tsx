import { Suspense } from "react";
import BgCorrect from "../../assets/correct.svg"
import BgWrong from "../../assets/wrong.svg"
import BgScore from "../../assets/score.svg"
import BgAmount from "../../assets/amount.svg"
import { useScore } from "../../store/useScore";
import Navigasi from "../../components/Navigasi";

export default function Score(){
    const { benar, salah, jumlah, total, hasil } = useScore()
    return(
        <Suspense>
            <section className="h-screen w-full bg-[#FEFBF6] grid grid-rows-7">
                <Navigasi />
                <main className="row-span-6 grid place-items-center">
                    <p className="text-3xl text-[#B67352] text-center font-bold mt-4">Your quiz score</p>
                    <div className="grid grid-cols-4 w-1/2 place-self-start mx-auto gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl text-[#B67352] text-center">Correct</p>
                            <img className="h-40" src={BgCorrect} alt="benar" />
                            <p className="text-4xl text-[#B67352] text-center font-bold">{benar}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl text-[#B67352] text-center">Incorrect</p>
                            <img className="h-40" src={BgWrong} alt="salah" />
                            <p className="text-4xl text-[#B67352] text-center font-bold">{salah}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl text-[#B67352] text-center">Answers</p>
                            <img className="h-40" src={BgAmount} alt="salah" />
                            <p className="text-4xl text-[#B67352] text-center font-bold">{jumlah}/{total}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-2xl text-[#B67352] text-center">Results</p>
                            <img className="h-40" src={BgScore} alt="skor" />
                            <p className="text-4xl text-[#B67352] text-center font-bold">{hasil}</p>
                        </div>
                    </div>
                </main>
            </section>
        </Suspense>
    )
}