import { Helmet } from 'react-helmet';

import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Header } from 'components/Header/Header';
import { TypographyH2, TypographyH3 } from 'components/ui/typography';
import { withPageWrapper } from 'components/PageWrapper/PageWrapper';

import styles from './CookiePolicy.module.css';

export const CookiePolicy = withPageWrapper(() => (
  <div>
    <Helmet>
      <title>Polityka Cookies | Generatory 3.0</title>
    </Helmet>
    <div className="pl-0 max-md:pl-2 pr-2 max-md:pr-4">
      <Header>
        <BreadCrumbs
          crumbs={[
            {
              content: <span className="whitespace-nowrap">Generatory 3.0</span>,
              id: 'root',
              to: '/',
            },
            {
              content: 'Polityka Cookies',
            },
          ]}
        />
      </Header>
    </div>
    <main className={styles.mainWrapper}>
      <p className="!mt-0">
        Poniższa Polityka Cookies określa zasady zapisywania i uzyskiwania dostępu do danych na Urządzeniach
        Użytkowników korzystających z Serwisu do celów świadczenia usług drogą elektroniczną przez Administratora
        Serwisu.
      </p>

      <section>
        <TypographyH2 id="definicje">§1 Definicje</TypographyH2>
        <TypographyH3>Serwis</TypographyH3>
        <p>
          Serwis internetowy działający pod adresem <a href="https://pjatk.zdaj.se">https://pjatk.zdaj.se</a> oraz{' '}
          <a href="https://pjatk.zdaj.se">https://zdaj-se.vercel.app</a>
        </p>

        <TypographyH3>Serwis zewnętrzny</TypographyH3>
        <p>Serwis internetowe partnerów, usługodawców lub usługobiorców Administratora</p>

        <TypographyH3>Administrator</TypographyH3>
        <p>
          Firma Bartosz Legięć, prowadząca działalność pod adresem: ul. Mariana Pisarka 2/13, 03-984 Warszawa, o nadanym
          numerze identyfikacji podatkowej (NIP): 1132980415, o nadanym numerze REGON: 380929862, świadcząca usługi
          drogą elektroniczną za pośrednictwem Serwisu oraz przechowująca i uzyskująca dostęp do informacji w
          urządzeniach Użytkownika
        </p>

        <TypographyH3>Użytkownik</TypographyH3>
        <p>Osoba fizyczna, dla której Administrator świadczy usługi drogą elektroniczna za pośrednictwem Serwisu.</p>

        <TypographyH3>Urządzenie</TypographyH3>
        <p>
          Elektroniczne urządzenie wraz z oprogramowaniem, za pośrednictwem, którego Użytkownik uzyskuje dostęp do
          Serwisu
        </p>

        <TypographyH3>Cookies (ciasteczka)</TypographyH3>
        <p>Dane tekstowe gromadzone w formie plików zamieszczanych na Urządzeniu Użytkownika</p>
      </section>

      <section>
        <TypographyH2 id="rodzaje-cookies">§2 Jakich plików cookies używamy</TypographyH2>
        <TypographyH3>Cookies wewnętrzne</TypographyH3>
        <p>Pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez system teleinformatyczny Serwisu</p>

        <TypographyH3>Cookies trwałe</TypographyH3>
        <p>
          Pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez Serwis do momentu ich ręcznego usunięcia.
          Pliki nie są usuwane automatycznie po zakończeniu sesji Urządzenia chyba że konfiguracja Urządzenia
          Użytkownika jest ustawiona na tryb usuwanie plików Cookie po zakończeniu sesji Urządzenia.
        </p>

        <TypographyH3>Niezbędne pliki cookies</TypographyH3>
        <p>
          Niezbędne pliki cookies obejmują ściśle niezbędne pliki cookies, których używamy do funkcjonowania Serwisu
          oraz funkcjonalne pliki cookie, które pomagają w działaniu i projektowaniu Serwisu. Ulepszają one
          funkcjonalność Serwisu, a także umożliwiają jej personalizację.
        </p>
        <p>
          Funkcjonalne pliki cookie pomagają nam zapamiętać wybrane przez Ciebie ustawienia strony, czy też pomagają
          przy innych funkcjach podczas przeglądania i korzystania z Serwisu. Pliki te pomagają nam zapamiętać Twoje
          preferencje i ułatwiają funkcjonowanie Serwisu, kiedy odwiedzasz ją ponownie.
        </p>
        <p>
          Możesz dostosować ustawienia przeglądarki w taki sposób by blokowała ona działanie tego rodzaju plików
          cookies. Pamiętaj, że jeżeli zdecydujesz się na takie rozwiązanie, to niektóre części Serwisu mogą nie
          działać.
        </p>

        <TypographyH3>Analityczne pliki cookies</TypographyH3>
        <p>
          Analityczne pliki cookies pomagają badać statystyki dotyczące ruchu na Serwisu oraz sprawdzać źródła tego
          ruchu. Ponadto, umożliwiają uzyskać informację, które zakładki strony są najbardziej popularne, a także jak
          użytkownicy poruszają się po Serwisu. Pliki te mają na celu poprawić komfort korzystania z Serwisu. Dodatkowo,
          dzięki analitycznym plikom cookies mamy możliwość wykrywać różnego rodzaju nadużycia np. sztuczny ruch
          internetowy (boty).
        </p>
        <p>
          Na działanie analitycznych plików cookies niezbędna jest Twoja zgoda. Możesz dostosować ustawienia
          przeglądarki w taki sposób by blokowała ona działanie tego rodzaju plików cookies. Aby uzyskać więcej
          informacji na temat zarządzania swoimi plikami cookies (wyrażenia i wycofania zgody), przeczytaj pkt 5
          niniejszej polityki.
        </p>
      </section>

      <section>
        <TypographyH2 id="bezpieczeństwo">§3 Bezpieczeństwo</TypographyH2>
        <TypographyH3>Mechanizmy składowania i odczytu</TypographyH3>
        <p>
          Mechanizmy składowania i odczytu Cookies nie pozwalają na pobierania jakichkolwiek danych osobowych ani
          żadnych informacji poufnych z Urządzenia Użytkownika. Przeniesienie na Urządzenie Użytkownika wirusów, koni
          trojańskich oraz innych robaków jest praktycznie niemożliwe.
        </p>

        <TypographyH3>Cookie wewnętrzne</TypographyH3>
        <p>Zastosowane przez Administratora Cookie wewnętrzne są bezpieczne dla Urządzeń Użytkowników</p>

        <TypographyH3>Cookie zewnętrzne</TypographyH3>
        <p>
          Za bezpieczeństwo plików Cookie pochodzących od partnerów Serwisu Administrator nie ponosi odpowiedzialności.
          Lista partnerów zamieszczona jest w dalszej części Polityki Cookie.
        </p>
      </section>

      <section>
        <TypographyH2 id="cele-do-których-wykorzystywane-są-pliki-cookie">
          §4 Cele do których wykorzystywane są pliki cookie
        </TypographyH2>
        <TypographyH3>Usprawnienie i ułatwienie dostępu do Serwisu</TypographyH3>
        <p>
          Administrator może przechowywać w plikach Cookie informacje o preferencjach i ustawieniach użytkownika
          dotyczących Serwisu aby usprawnić, polepszyć i przyśpieszyć świadczenie usług w ramach Serwisu.
        </p>

        <TypographyH3>Dane statystyczne</TypographyH3>
        <p>
          Administrator oraz Serwisy zewnętrzne wykorzystuje pliki Cookie do zbierania i przetwarzania danych
          statystycznych takich jak np. statystyki odwiedzin, statystyki Urządzeń Użytkowników czy statystyki zachowań
          użytkowników. Dane te zbierane są w celu analizy i ulepszania Serwisu.
        </p>
      </section>

      <section>
        <TypographyH2 id="możliwości-określania-warunków-przechowywania-i-uzyskiwania-dostępu-na-urządzeniach-użytkownika-przez-serwis">
          §5 Możliwości określania warunków przechowywania i uzyskiwania dostępu na urządzeniach użytkownika przez
          serwis
        </TypographyH2>
        <p>
          Użytkownik może w dowolnym momencie, samodzielnie zmienić ustawienia dotyczące zapisywania, usuwania oraz
          dostępu do danych zapisanych plików Cookies
        </p>
        <p>
          Informacje o sposobie wyłączenia plików Cookie w najpopularniejszych przeglądarkach komputerowych i urządzeń
          mobilnych dostępna są na stronie:{' '}
          <a href="http://jakwylaczyccookie.pl/" target="_blank" rel="noreferrer">
            jak wyłączyć cookie
          </a>
          .
        </p>
        <p>
          Użytkownik może w dowolnym momencie usunąć wszelkie zapisane do tej pory pliki Cookie korzystając z narzędzi
          Urządzenia Użytkownika za pośrednictwem którego Użytkownik korzysta z usług Serwisu.
        </p>
      </section>

      <section>
        <TypographyH2 id="wyłączenie-odpowiedzialności">§6 Wyłączenie odpowiedzialności</TypographyH2>
        <p>
          Administrator stosuje wszelkie możliwe środki w celu zapewnienia bezpieczeństwa danych umieszczanych w plikach
          Cookie. Należy jednak zwrócić uwagę, że zapewnienie bezpieczeństwa tych danych zależy od obu stron, w tym
          działalności Użytkownika oraz satnu zabezpieczeń urządzenia z którego korzysta.
        </p>
        <p>
          Administrator nie bierze odpowiedzialności za przechwycenie danych zawartych w plikach Cookie, podszycie się
          pod sesję Użytkownika lub ich usunięcie, na skutek świadomej lub nieświadomej działalność Użytkownika,
          wirusów, koni trojańskich i innego oprogramowania szpiegującego, którymi może być zainfekowane Urządzenie
          Użytkownika.
        </p>
        <p>
          Użytkownicy w celu zabezpieczenia się przed wskazanymi w punkcie poprzednim zagrożeniami powinni stosować się
          do{' '}
          <a
            href="https://nety.pl/cyberbezpieczenstwo/zasady-ogolne-korzystania-z-sieci-internet/"
            target="_blank"
            rel="noreferrer"
          >
            zasad cyberbezpieczeństwa w sieci internet
          </a>
          .
        </p>
        <p>
          Usługi świadczone przez podmioty trzecie są poza kontrolą Administratora. Podmioty te mogą w każdej chwili
          zmienić swoje warunki świadczenia usług, cel oraz wykorzystanie plików cookie. Administrator nie odpowiada na
          tyle na ile pozwala na to prawo za działanie plików cookies używanych przez serwisy partnerskie. Użytkownicy w
          każdej chwili mogą samodzielnie zarządzać zezwoleniami i ustawieniami plików cookie dla każedej dowolnej
          witryny.
        </p>
      </section>

      <section>
        <TypographyH2 id="wymagania-serwisu">§7 Wymagania serwisu</TypographyH2>
        <p>
          Ograniczenie zapisu i dostępu do plików Cookie na Urządzeniu Użytkownika może spowodować nieprawidłowe
          działanie niektórych funkcji Serwisu.
        </p>
        <p>
          Administrator nie ponosi żadnej odpowiedzialności za nieprawidłowo działające funkcje Serwisu w przypadku gdy
          Użytkownik ograniczy w jakikolwiek sposób możliwość zapisywania i odczytu plików Cookie.
        </p>
      </section>

      <section>
        <TypographyH2 id="zmiany-w-polityce-cookie">§8 Zmiany w polityce cookie</TypographyH2>
        <p>
          Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej Polityki Cookie bez konieczności
          informowania o tym użytkowników.
        </p>
        <p>Wprowadzone zmiany w Polityce Cookie zawsze będą publikowane na tej stronie.</p>
        <p>Wprowadzone zmiany wchodzą w życie w dniu publikacji Polityki Cookie.</p>
      </section>
    </main>
  </div>
));
