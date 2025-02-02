'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Cpu, 
  Network, 
  Users, 
  ArrowRight, 
  ExternalLink,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Hub',
    description: 'Tích hợp và triển khai các mô hình AI tiên tiến cho tự động hóa thông minh.',
    color: 'text-pink-500'
  },
  {
    icon: Network,
    title: 'IoT Platform',
    description: 'Kết nối và quản lý thiết bị IoT với nền tảng đám mây mạnh mẽ.',
    color: 'text-orange-500'
  },
  {
    icon: Cpu,
    title: 'Automation',
    description: 'Tự động hóa quy trình sản xuất với các giải pháp robot và PLC.',
    color: 'text-emerald-500'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Chia sẻ và học hỏi từ cộng đồng các chuyên gia tự động hóa.',
    color: 'text-green-500'
  }
];

const benefits = [
  {
    icon: BarChart3,
    title: 'Tăng hiệu suất',
    description: 'Cải thiện năng suất sản xuất lên đến 40% với giải pháp tự động hóa thông minh.'
  },
  {
    icon: Shield,
    title: 'An toàn & Bảo mật',
    description: 'Bảo vệ dữ liệu và quy trình với các tiêu chuẩn bảo mật cao cấp.'
  },
  {
    icon: Zap,
    title: 'Tối ưu năng lượng',
    description: 'Giảm tiêu thụ năng lượng và chi phí vận hành với AI thông minh.'
  }
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex h-14 items-center justify-between px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg">D</span>
          </div>
          <span className="text-xl font-bold">DeltaX Hub</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Đăng nhập</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Dùng thử miễn phí</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nền tảng Tự động hóa Công nghiệp
            <br />
            <span className="text-primary">Thông minh & Toàn diện</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tối ưu hóa quy trình sản xuất với giải pháp tự động hóa tích hợp AI, 
            IoT và robot công nghiệp hàng đầu.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="gap-2">
                Bắt đầu ngay <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard/community">
              <Button variant="outline" size="lg" className="gap-2">
                Khám phá cộng đồng <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Giải pháp toàn diện</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="card-neumorphic p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Lợi ích nổi bật</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Sẵn sàng nâng cấp quy trình sản xuất của bạn?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/80">
              Bắt đầu với DeltaX Hub ngay hôm nay và trải nghiệm sự khác biệt.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="gap-2">
                  Dùng thử miễn phí <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard/community">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground hover:bg-primary-foreground/10">
                  Tìm hiểu thêm <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center">
                <span className="text-primary text-lg font-bold">D</span>
              </div>
              <span className="text-xl font-bold">DeltaX Hub</span>
            </Link>
            <p className="text-muted-foreground">
              Nền tảng tự động hóa công nghiệp thông minh hàng đầu Việt Nam.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">AI Hub</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">IoT Platform</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Automation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Công ty</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Về chúng tôi</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Tài liệu</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Hướng dẫn</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">API</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 DeltaX Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
