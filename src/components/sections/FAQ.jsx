import { useLanguage } from '../../utils/language'
const questions = [
  [
    'Siapa Arief Maulana?',
    'Saya seorang full-stack developer dari Bandung yang membangun aplikasi web dan mengeksplorasi machine learning serta IoT.',
  ],
  [
    'Apa yang bisa kita kerjakan bersama?',
    'Website, antarmuka aplikasi, integrasi API, dan fondasi backend. Kita mulai dengan kebutuhan dan tujuan proyek untuk menentukan ruang lingkupnya.',
  ],
  [
    'Teknologi apa yang digunakan?',
    'Di portfolio ini Anda bisa menemukan proyek TypeScript, JavaScript, React, Next.js, Python, serta berbagai integrasi layanan web.',
  ],
  [
    'Di mana saya bisa melihat kode proyek?',
    'Setiap halaman proyek memiliki tautan ke repositori GitHub. Beberapa proyek juga memiliki aplikasi publik yang bisa langsung dicoba.',
  ],
  [
    'Bagaimana menentukan biaya dan waktu?',
    'Ruang lingkup, fitur, kebutuhan desain, dan integrasi dibahas terlebih dahulu. Kirimkan gambaran proyek melalui halaman Contact untuk memulai percakapan.',
  ],
  [
    'Bagaimana cara menghubungi?',
    'Gunakan halaman Contact atau kirim email langsung ke ariefmavlana8@gmail.com. CV dan profil profesional juga tersedia di bagian bawah halaman.',
  ],
]

export default function FAQ() {
  const { t } = useLanguage()
  return (
    <section className="faq-section site-container">
      <h2 className="editorial-heading">{t('FAQ')}</h2>
      <div className="faq-list">
        {questions.map(([question, answer], i) => (
          <details key={t(question)}>
            <summary>
              <span>
                <small className="eyebrow">0{i + 1} / </small>
                {t(question)}
              </span>
            </summary>
            <p>{t(answer)}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
