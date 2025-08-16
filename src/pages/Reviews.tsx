import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-to-br from-accent/10 to-pool/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-display font-bold mb-6 text-foreground">
              {t('nav.reviews')} & Case Studies
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-body max-w-3xl mx-auto">
              Real stories from happy customers who've experienced the BuildCare UAE difference.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-8 w-8 fill-secondary text-secondary" />
              ))}
              <span className="text-2xl font-display font-bold ml-2">4.9/5</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map((review, index) => (
              <motion.div
                key={review}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground font-body mb-4">
                    "Amazing service! The team was professional and the kawaii approach made the whole experience delightful."
                  </p>
                  <div className="font-display font-semibold">- Happy Customer #{review}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;