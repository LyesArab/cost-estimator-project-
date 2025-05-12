"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FadeIn, ScaleIn, SlideInFromTop } from "@/components/ui/motion";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 py-10 px-4">
      <Card className="w-full max-w-3xl mx-auto overflow-hidden">
        <SlideInFromTop>
          <CardHeader className="bg-white pb-4">
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Calculateur de Coûts pour les Projets Freelances
            </CardTitle>
          </CardHeader>
        </SlideInFromTop>

        <ScaleIn>
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium shadow-sm">1</div>
                <div className="h-1 w-14 bg-gray-200 mx-1"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">2</div>
                <div className="h-1 w-14 bg-gray-200 mx-1"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">3</div>
              </div>
            </div>

            <div className="space-y-8">
              <FadeIn>
                <p className="text-base text-center mb-6 text-gray-600">
                  Cet outil vous aide à estimer le coût réel de vos projets en prenant en compte
                  vos dépenses, le temps de développement et les taxes.
                </p>
              </FadeIn>

              <div className="space-y-4">
                <FadeIn delay={100}>
                  <div className="p-5 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">1</div>
                      <div>
                        <h3 className="font-medium text-base text-gray-800">Dépenses du projet</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Listez toutes les dépenses liées au projet: serveurs, abonnements, licences, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={200}>
                  <div className="p-5 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">2</div>
                      <div>
                        <h3 className="font-medium text-base text-gray-800">Fonctionnalités</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Définissez les fonctionnalités, leur complexité et estimez le temps nécessaire.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={300}>
                  <div className="p-5 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">3</div>
                      <div>
                        <h3 className="font-medium text-base text-gray-800">Devis et facturation</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Calculez le coût total incluant taxes et générez un devis professionnel.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </CardContent>
        </ScaleIn>

        <CardFooter className="flex flex-col gap-4 p-6 pt-4 border-t">
          <Link href="/expenses" className="w-full">
            <Button size="lg" className="w-full">
              Commencer l'estimation
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
          
          <p className="text-center text-xs text-gray-500">
            Inspiré par <a href="https://simulator.boulesnane.com/" className="underline hover:text-blue-600" target="_blank" rel="noopener noreferrer">le simulateur de Reda Boulesnane</a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
} 